const express = require('express');
const app = express();
const port = 3000;

//const bodyParser = require('body-parser');

let users = {};

//app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res)=>{
    console.log('hello users');
});

app.post('/users', (req, res) => {
    const id = Date.now().toString();
    const { name } = req.body;
    users[id] = {id, name};
    res.send(users[id]);
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id',(req,res) => {
    const user = users[req.params.id];
    res.send(user);
})

app.put('/users/:id', (req, res) => {
    const user = users[req.params.id];
    const {name} = req.body;
    users[req.params.id].name = name;
    res.send(users[req.params.id]);
});

app.delete('/users/:id', (req, res) => {
    const user = users[req.params.id];
    delete users[req.params.id];
    res.send('삭제되었습니다.');
});

app.listen(port, () => {
    console.log(`포트가 ${port} 에서 실행중입니다.`);
});


