const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

const db = new sqlite.Database('users.db');

const users = [
    {username: 'user1', password: 'pass1'},
    {username: 'user2', password: 'pass2'},
    {username: 'user3', password: 'pass3'},
];

async function insertUsers(){
    for(const user of users){
        const hash = await bcrypt.hash(user.password, 10);
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
            [user.username, hash],
            (err) => {
                console.log(`${user.username}: ${hash} 등록성공 `);
            }
        )
    }
}