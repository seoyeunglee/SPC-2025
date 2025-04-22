const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

// 아래 모든 라인이 비동기로 실행됨을 이해해야 한다. 매우 큰 주의사항 !!!

db.run('CREATE TABLE IF NOT EXISTS messages (text TEXT)');
db.run('INSERT INTO messages (text) VALUES (?)', ['Hello, SQLite!']);

db.each('SELECT * FROM messages', (err, row) => {
    console.log(row.text);
});

db.close();
