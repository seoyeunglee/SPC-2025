const express = require('express');
const sqlite = require('better-sqlite3');

const app = express();
const db = sqlite('users.db');

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // console.log('login 요청', req.body);
    const result = db.prepare('SELECT * FROM users WHERE username=? AND password=?').get();
    // console.log(result);
    // res.send('ok');
    if(user){
        res.send('로그인성공');
    }else{
        res.send('로그인 실패');
    }
})

app.listen(3000, () => {
    console.log('server ready');
});