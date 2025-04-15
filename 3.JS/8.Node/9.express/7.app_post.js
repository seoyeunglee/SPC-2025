const express = require('express');
// import express from 'express';

const app = express();
const port = 3000;

const bodyParser = require('body-parser'); // 사용자를 저장할 

const users = {};

app.use(bodyParser.json()); // 옛날방식 

app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어 

app.get('/', (req, res) => {
    res.send('헬로우 Exp');
});

app.get('/user', (req,res) => {
    res.send(users);
});

app.post('/user', (req, res) => {
    console.log('사용자 생성 요청 ', req.body);
    const id = Date.now();
    users[id] = req.body.name;
    res.send('성공');
});

app.listen(port, () => {
    console.log(`서버 포트가 ${port}에서 실행 중입니다.`);
});


