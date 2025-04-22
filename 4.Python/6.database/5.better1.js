const sqlite3 = require('better-sqlite3');

// DB 연결
const db = sqlite3('test.db');

// 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
  )
`);

// 데이터 삽입
const insert = db.prepare('INSERT INTO greetings (message) VALUES (?)');
insert.run('Hello, BetterSQLite3!');

const select = db.prepare('SELECT * FROM greetings');
const greetings = select.all();
console.log(greetings);

greetings.forEach((row) => {
    console.log(`인사 ${row.id}: ${row.message}`);
});