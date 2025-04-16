const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const users = {};
let nextId = 1;

// app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('메인홈');
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.use(express.static('public'));

app.get('/users', (req, res) => {
    console.log('사용자 조회');
    res.send(users); // text/html characterutf-8 <-- 문자열 이게 기본값

});

app.post('/users', (req, res) => {
    console.log('사용자 생성 : ', req.body);
    try{
        const name = req.body.name;
        users[nextId++] = name; //나의 key도 이름, value도 이름이다..
        res.status(204).send("등록 성공");
    } catch(error){
        res.status(500).send("서버 내부 오류");
    }
});

app.put('/users/:id', (req, res) => {
    console.log('사용자 수정');
    try{
        const id = req.params.id;
        users[id] = req.body.name;
        res.status(200).send('사용자 수정');
    } catch(error){
        res.status(500).send("서버 내부 오류");
    }
    
});

app.delete('/users/:id', (req, res) => {
    console.log('사용자 삭제 : ', req.params.id);
    try{
        const id = req.params.id;

        if(!users[id]){
            return res.status(404).send(`해당 사용자 ID : ${id} 는 존재하지 않습니다.`);
        }

        delete users[id];
        res.status(204).send(); // 204
    } catch(error){
        res.status(500).send("서버 내부 오류");
    }
    
});

app.listen(port, () => {
    console.log(`server ready on ${port}`);
});