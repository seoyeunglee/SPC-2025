// npm i express ejs
const express = require("express");
const app = express();
const path = require('path');
const port = 3000;

app.get('view engin', 'ejs');

app.get('/', (req, res) => {
    // res.sendFile('C:\\src\\spc\\SPC-2025\\3.JS\\8.Node\\12.ejs\\index.html');
    // res.sendFile(path.join(__dirname, 'index.html'));
    res.render('index', {title: '나의타이틀', message:'EJS 학습중입니다.'});
});

app.listen(port, () => {
    console.log('서버 레디');
});
