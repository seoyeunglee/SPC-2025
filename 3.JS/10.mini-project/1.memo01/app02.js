const express = require('express');
const session = require('express-session');
const sqlite = require('sqlite3');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}

const app = express();
const port = 3000;
const db = new sqlite.Database('memo.db', (err) => {
    if(!err) console.log('db 연결 성공!');
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // uploads 폴더에 저장
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext); // 예: image-123456789.png
    }
  });
  
  const upload = multer({ storage });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'memo1234',
    resave: false,
    saveUninitialized: false
}));

app.get('/',  (req, res) => res.redirect('/memo02'));
app.get('/memo02', (req, res) => res.sendFile(path.join(__dirname, 'public', 'memo02.html')));

app.post('/api/input', upload.single('image'), (req, res) => {
    const{ title, message } = req.body;
    // const image = req.file;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const query = 'INSERT INTO memo1 (title, message, image)  VALUES (?, ?, ?)';
    db.run(query, [title, message, image], (err) => {
        if(err){
            console.log(err);
            return res.send(500).send('db error');
        }
        // res.send(`등록완료 title: ${title}, message:${message}. image: ${image}`);
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

app.put('/api/editmemo/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const{ title, message } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    console.log(title, message, image);

    const query = 'UPDATE memo1 SET title=?, message=?, image=? WHERE id=?';

    db.run(query, [title, message, image, id], function(err){
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