const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('헬로우');
});
app.get('/user', (req, res) => {
    res.send('헬로우 사용자 정보');
});
app.delete('/user', (req, res) => {
    res.send('헬로우 사용자 삭제');
});

app.listen(port, () => {
    console.log("서버레디");
})