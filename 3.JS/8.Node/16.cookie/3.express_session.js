const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true,
}));

// 커스텀 미들웨어
function visitCounter(req, res, next){
    // 세션에 visitcount라는게 없으면 0으로 초기화
    req.session.visitCount = req.session.visitCount || 0;
    // 방문횟수증가 
    req.session.visitCount++;
    next();
}
app.use(visitCounter);

app.get('/', (req, res) => {
    req.session.username = 'lala';
    req.session.ticket = 'spc2025';
    req.session.cart = ['python', 'javascript', 'golang'];
    res.send(`잘왔따, 당신의 방문횟수는 : ${req.session.visitCount}`)
});

app.get('/user', (req, res) => {
    const yoursession = req.session;
    console.log(yoursession);

    const{username, ticket, cart} = req.session;

    if(username){
        res.send(`당신의 이름은 ${username}, 장바구니에는 ${cart}가 담겨있네요`);
    }else{
        res.send('사용자 정보가 없습니다.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('안녕히가세요...');
});

app.get('/readsession', (req, res) => {
    const yoursession = req.session;
    console.log(yoursession);

    const ticket = req.session.ticket;
    const cart = req.session.cart;

    res.send(`너의 이전정보는: ${ticket}, ${cart}`);
})

app.listen(port, () => {
    console.log('server ready');
})