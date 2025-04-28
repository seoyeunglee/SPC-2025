const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '2.example.html'));
});

app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    console.log('입력값: ', email, password);
    res.json({message: '로그인성공'});
});

app.listen(port, () => {
    console.log('server ready');
});