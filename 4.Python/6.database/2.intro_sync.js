const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

// 아래 모든 라인이 비동기로 실행됨을 이해해야 한다. 매우 큰 주의사항 !!!

db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)', (err) => {
    console.log('테이블 생성에 성공한 시점');
    db.run('INSERT INTO messages (text) VALUES (?)', ['Hello, SQLite!'], (err) => {
        console.log('여기는 삽입에 성공한 시점');
        db.each('SELECT * FROM messages', (err, row) => {
            console.log(row.text);
        });

        db.close((err) => {
            console.log('성공적으로 연결 종료 시점');
        });
        
    });
});


