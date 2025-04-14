const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('헬로우, 메인 페이지');
});
// 익스프레스가 URL 경로에 가변인자를 받기 위해서, 콜론 사용하기로 정함
app.get('/users/:id', (req, res) => {
    const id = req.params.id; // 위에 가변 인자는 req.params 안에 담겨서 옴 
    res.send(`사용자 정보, ID: ${req.params.id}`);
});

app.get('/users/:id/profile', (req, res) => {
    const id = req.params.id; // 위에 가변 인자는 req.params 안에 담겨서 옴 
    res.send(`사용자 정보 프로필 상세 페이지, ID: ${req.params.id}`);
});

//curl localhost:3000/users/abc
//사용자 정보, ID: abc

app.get('/search', (req, res) => {
    const keyword = req.query.keyword; // 쿼리 파라미터는 req.query 안에 담겨서 옴 
    const category = req.query.category;

    res.send(`키워드 : ${keyword}, 카테고리 : ${category}`);
});

// http://localhost:3000/search?keyword=python&category=food

app.listen(port, () => {
    console.log(`서버 레디 on ${port}`);
});