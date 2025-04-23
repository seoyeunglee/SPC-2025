const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

const users = [
    {id:1, username:'user1', password: 'pass1'},
    {id:2, username:'user2', password: 'pass2'},
];

app.use(express.urlencoded());
app.use(morgan('dev'));
// app.use(express.static('public'));

app.use(session({
    secret: 'this-is-my-password',
    resave: false,
    saveUninitialized: true,
}));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    const user = users.find((u) => u.username === username && u.password === password);
    if(user){
        req.session.user = {username:user.username, password:user.password}
        res.json({message: '로그인성공'});
        
        console.log(username, password);
    }else{
        res.status(401).json({message: '로그인 실패'});
    }
});

app.get('/user', (req, res) => {
    const yoursession = req.session;
    console.log(yoursession);

    if(username){
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
