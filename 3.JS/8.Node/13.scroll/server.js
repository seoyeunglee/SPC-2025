const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

let num = 1;

app.use(express.json());

// const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);

function myData(_, i){
    return  `Item ${i + 1}`;
}
const data = Array.from({ length: 200 }, myData);

// console.log(data);

app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/get-items', (req, res) => {
    // 미션2. 원하는 갯수만큼만 보내주려면 어떻게 설계?? 
    //        입력 파라미터를 어떻게 정해야 할까??
    // 미션2-1. 그래서, 난 어떻게 이 많은걸 나눌까~~~
    // 미션2-2. 이걸 구현.
    // console.log('데이터 조회');
    // console.log(req.query);

    // const start = req.query.start;
    // const end = req.query.end;

    const {start, end} = req.query;

    // const userItems = [];
    // for(let i = start; i < end; i++){
    //     userItems.push(data[i]);
    // }
    // console.log(userItems);

    // res.json(data);

    const userItems = data.slice(start, end);

    res.json(userItems);

});

app.post('/get-items', (req, res) => {
    console.log('데이터 생성 : ', req.body);
    try{
        const name = req.body.name;
        data[num++] = name;
        res.status(204).send("등록성공");
    }catch(err){
        res.status(500).send("서버내부오류");
    }
});

app.put('/get-items/:id', (req, res) => {
    console.log('사용자 수정');
    try{
        const id = req.params.id;
        data[id] = req.body.name;
        res.status(200).send('사용자수정완료');
    }catch(err){
        res.status(500).send('서버내부오류');
    }
});

app.delete('/get-items/:id', (req, res) =>{
    console.log('삭제 데이터  : ', req.params.id);
    try{
        const id = req.params.id;

        if(!users[id]){
            return res.status(404).send(`해당 데이터 ${id}는 존재하지 않습니다.`);
        }
        delete data[id];
        res.status(204).send();
    }catch(err){
        res.status(500).send('서버내부오류');
    }
});

app.listen(port, () => {
    console.log('서버 레디');
});