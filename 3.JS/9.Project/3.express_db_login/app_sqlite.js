const express = require('express');
const sqlite = require('better-sqlite3');

const app = express();
const db = sqlite('users.db');

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.run('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if(row) res.send('success');
        else res.send('실패로그인');
    })
    res.send('ok');
})

app.listen(3000, () => {
    console.log('server ready');
});