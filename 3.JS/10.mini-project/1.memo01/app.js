const express = require('express');
const session = require('express-session');
const sqlite = require('sqlite3');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;
const db = new sqlite.Database('memo.db', (err) => {
    if(!err) console.log('db 연결 성공!');
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'memo1234',
    resave: false,
    saveUninitialized: false
}));

app.get('/',  (req, res) => res.redirect('/memo01'));
app.get('/memo01', (req, res) => res.sendFile(path.join(__dirname, 'public', 'memo01.html')));

app.post('/api/input', (req, res) => {
    const{ title, message } = req.body;
    const query = 'INSERT INTO memo1 (title, message)  VALUES (?, ?)';
    db.run(query, [title, message], (err) => {
        if(err){
            console.log(err);
            return res.send(500).send('db error');
        }
        res.send(`등록완료 title: ${title}, message:${message}`);
    });
});

app.get('/api/memos', (req, res) => {
    const query = 'SELECT * FROM memo1';
    db.all(query, [], (err, rows) => {
        res.json(rows);
    });
});

app.post('/api/delmemo/:id', (req, res) => {
    const { id } = req.params;
    const query= 'DELETE FROM memo1 WHERE id=?';

    db.run(query, [id], function(err) { 
        if(err){
            console.log(err);
            return res.status(500).json({message: '삭제실패'});
        }
        if(this.changes === 0){
            return res.status(404).json({message: '메모없음'});
        }
        res.json({message:'삭제완료'});
    });
});

app.put('/api/editmemo/:id', (req, res) => {
    const { id } = req.params;
    const{ title, message } = req.body;
    console.log(title, message);
    const query = 'UPDATE memo1 SET title=?, message=? WHERE id=?';

    db.run(query, [title, message, id], function(err){
        if(err){
            console.log(err);
            return res.status(500).json({message: '수정실패'});
        }
        res.json({message:'수정완료'});
    });
});




app.listen(port, () => {
    console.log('server ready');
})