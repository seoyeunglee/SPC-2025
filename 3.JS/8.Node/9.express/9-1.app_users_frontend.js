const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const users = {};
let nextId = 1;

app.use(express.json());
app.get('/', (req, res) => {
    console.log('main home');
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.use(express.static('public'));

app.get('/users', (req, res) => {
    console.log('사용자 조회');
    res.send(users);
});

app.post('/users', (req, res) => {
    console.log('사용자 생성 : ', req.body);
    const name = req.body.name;
    users[nextId++] = name;
    res.send('사용자 생성');
});

app.put('/users/:id', (req, res) => {
    console.log('사용자 수정');
    const id = req.params.id;
    users[id] = req.body.name;
    res.send('사용자 수정');
});

app.delete('/users/:id', (req, res) => {
    console.log('사용자 삭제, ', req.params.id);
    const id = req.params.id;
    delete users[id];
    res.send('사용자 삭제');
});

app.listen(port, () => {
    console.log(`server ready on ${port}`);
})
