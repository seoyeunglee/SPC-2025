const express = require('express');
const morgan = require('morgan');
const sqlite = require('sqlite3');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite.Database('users.db');

app.use(express.urlencoded());
app.use(morgan('dev'));

app.use(session({
    secret: 'cart-session',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    const user = req.session;
    console.log(user);
    if(!user.username){
        console.log('username 없음');
    }else{
        const{username, password} = req.session.user;
        res.send(`
            <script>
            alert('환영합니다! ${req.session.username}님!');
            window.location.href = '/';
            </script>
            `);
    }
    
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    db.get('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if(row){
            req.session.user = {username: row.username, password: row.password}
            // res.json({message: '로그인성공'});
            // res.status(200).json({message: `로그인 성공 ${username}님 반갑습니다.`});
            res.redirect('/');
        }else{
            // res.status(401).json({message: '로그인실패'});
            res.sendFile(path.join(__dirname, 'public', 'login.html'));
        }
    })
})

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));

    const user = req.session;
    console.log(user);

    if(user){
        const{username, password} = req.session.user;
        res.send(`로그인 정보 username: ${username}, password: ${password}`);
    }else{
        res.status(500).json({message: `사용자 정보 없음. 로그인 하세요`});
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

app.get('/logout', (req, res) => {
    // res.send('bye');
    req.session.destroy();
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(port, () =>{
    console.log('server ready in ',port);
});