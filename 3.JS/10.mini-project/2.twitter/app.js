const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const sqlite = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite.Database('tweet.db', (err) => {
    if(!err) console.log('DB 연결 성공');
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'password1234',
    resave: false,
    saveUninitialized:false
}));

app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));

app.get('/api/tweets', (req, res) => {
    const query = 'SELECT*fROM tweet';
    db.all(query, [], (err, rows) => {
        res.json(rows);
    });
});

app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    const query = 'SELECT * FROM user WHERE email=? AND password=?';

    db.get(query, [email, password], (err, row) => {
        if(err) console.log('error');
        if(row){
            req.session.user = {id:row.id, email:row.email};
            res.json({message: 'success', email:row.email});
        }else{
            res.status(401).json({message:'로그인실패'});
        }
    })
});

app.get('/api/check-login', (req, res) => {
    const user = req.session.user;
    if(user){
        res.json({message: 'Welcome back', username: user.username});
    }else{
        res.status(401).json({message: 'Not logged in'});
    }
});

app.post('/api/registerInput', (req, res) => {
    const{username, email, password} = req.body;
    const query = 'INSERT INTO user(username, email, password) VALUES (?,?,?)';
    db.run(query, [username, email, password], (err) => {
        if(err){
            console.log(err);
            return res.send(500).send('db error');
        }
        res.send(`등록완료 username: ${username}, email: ${email}, password: ${password}`);
    });
});



app.listen(port, () => {
    console.log('server ready');
});