const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

// 미들웨어를 통해서, 사용자의 입력값의 특정 데이터를 잘~ 파싱해서 req.body에 담아준다
app.use(express.json());

// app.use(express.urlencoded({extended:true}));
app.use(express.urlencoded());

app.use(express.text());

app.post('/api/submit-json', (req,res) => {
    const jsonData= req.body;
    console.log(jsonData);
    // res.send("응"); // 기본 응답값은 200
    // res.status(201).send(); // 응답값의 헤더에 201로 세팅.. ...
    // res.status(201).send("응"); // 응답값의 헤더에 201로 세팅.. ...
    // res.status(201).end(); // 응답값의 헤더에 201로 세팅해서, 바디 자체가 없음.. 

    const reply = {
        result: "success",
        message: "잘 받았음"
    }

    // res.json({jsonData});
    res.json(reply);
});

app.post('/submit-form', (req, res) => {
    const jsonData = req.body;
    console.log(jsonData);

    res.send(jsonData);
});

app.post('/submit-text', (req, res) => {
    const textData = req.body;
    console.log(textData);

    res.send(textData);
})

app.listen(port, () => {
    console.log(`server ready on ${port}`)
})