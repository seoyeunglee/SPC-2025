const sqlite3 = require('better-sqlite3')
const express = require('express')
const path = require('path')

const app= express();
const port = 3000;
const db = sqlite3('users.db');

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log('get');
    
})

app.get('/login', (req, res) => {
    console.log('getget');
})

app.post('/login', (req, res) => {
    console.log('post');
    const { id } = req.body;

    try{
        const search = db.prepare('SELECT * FROM users WHERE userId = ? ');
        const user = search.get(id);

        if(user){
            res.json({success: true, user});
        }else{
            res.status(404).json({success:false, message: '사용자를찾을수없음'});
        }
    }catch(err){
        console.error('DB에러: ',err);
        res.status(500).json({success: false, message: '서버오류'});
    }
});

app.listen(port, () => {
    console.log('server ready');
})