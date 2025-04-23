const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const db = new sqlite3.Database('users.db');

app.use(express.urlencoded());
app.use(morgan('dev'));
// app.use(express.static('public'));

app.use(session({
    secret: 'this-is-my-password',
    resave: false,
    saveUninitialized: true,
}));


app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    db.get('SELECT * FROM users WHERE username=?',[username],(err,row) => {
        if(row){
            const isMatch = await bcrypt.compare(password, row.password);
            if(isMatch){
                req.session.user = {username:row.username, password:row.password}
            res.json({message: '로그인성공'});
            }else{
                res.status(401).json({message: '비번 틀림:로그인 실패'});
            }
        }else{
            res.status(401).json({message: '계정틀림:로그인 실패'});
        }
    })

    // db.get('SELECT*FROM users WHERE username=? AND password=?', [username, hashedPassword], (err, row) => {
    //     // if(row) res.send('success');
    //     // else res.send('faliure');
    //     if(row){
    //         req.session.user = {username:row.username, password:row.password}
    //         res.json({message: '로그인성공'});
    //     }else{
    //         res.status(401).json({message: '로그인 실패'});
    //     }
    // })
    
    // const user = users.find((u) => u.username === username && u.password === password);
    
});

app.get('/user', (req, res) => {
    const user = req.session;
    console.log(user);

    if(user){
        const{username, password} = req.session.user;
        res.send(`로그인 정보 username: ${username} , password: ${password}`);
    }else{
        res.send('사용자 정보 없음. 로그인하세요.');
    }

});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('byebye~');
});

app.listen(port, () => {
    console.log('서버레디');
});
