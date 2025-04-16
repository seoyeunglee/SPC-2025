const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(express.json()); // 사용자의 입력을 파싱해서 req.body에 담아라. 
app.use(express.static('public'));
app.use(morgan('dev'));

app.post('/api/chat', (req, res) => {
    const question = "Echo : " + req.body.question;
    console.log(question);
    // 1. 사용자가 한말 그대로 반환하기.. (잘 아는 포캣으로~ 반환하기 = JSON)
    // const response = {"question" : question};

    res.json({question}); // {question} ===> {"question" : question}; 의 value
});




app.listen(port, () => {
    console.log('server ready');
});