const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('test.db');

function runQuery(query, params = []){
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if(err) reject(err);
            else resolve();
        });
    });

}

(async () => {
    await runQuery('CREATE TABLE IF NOT EXIST messages (text TEXT)');
    await runQuery('INSERT INTO messages (text) VALUES (?)', ['Hello, SQLite!']);
    console.log('동기화가 보장된곳..');
})();

