const express = require('express');
const session = require('express-session');
const sqlite = require('sqlite3');
const multer = require('multer');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const uploadsDir = path.join(__dirname, 'public', 'uploads');

try {
    fs.readdirSync(uploadsDir); // 폴더 존재 여부 확인
} catch (err) {
    console.error('public/uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync(uploadsDir, { recursive: true }); // 하위 폴더까지 생성
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

    // 먼저 이미지 경로 조회
    const selectQuery = 'SELECT image FROM memo1 WHERE id = ?';
    db.get(selectQuery, [id], (err, row) => {
        if (err) {
            console.error('이미지 경로 조회 실패:', err);
            return res.status(500).json({ message: '조회 실패' });
        }

        const imagePath = row?.image ? path.join(__dirname, 'public', row.image) : null;

        // DB에서 메모 삭제
        const deleteQuery = 'DELETE FROM memo1 WHERE id = ?';
        db.run(deleteQuery, [id], function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: '삭제 실패' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: '메모 없음' });
            }

            // 이미지가 있을 경우 로컬 파일 삭제
            if (imagePath) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.warn('이미지 파일 삭제 실패:', err.message);
                    } else {
                        console.log('이미지 파일 삭제 완료:', imagePath);
                    }
                });
            }

            res.json({ message: '삭제 완료' });
        });
    });
});

app.put('/api/editmemo/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { title, message } = req.body;
    const newImage = req.file ? `/uploads/${req.file.filename}` : null;

    const selectQuery = 'SELECT image FROM memo1 WHERE id = ?';
    db.get(selectQuery, [id], (err, row) => {
        if (err) {
            console.log('이미지 조회 실패:', err);
            return res.status(500).json({ message: '조회 실패' });
        }

        const oldImage = row?.image;
        const finalImage = newImage || oldImage;

        const updateQuery = 'UPDATE memo1 SET title=?, message=?, image=? WHERE id=?';
        db.run(updateQuery, [title, message, finalImage, id], function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: '수정 실패' });
            }

            // 새 이미지가 올라오고, 기존 이미지가 존재할 때 삭제
            if (newImage && oldImage) {
                const imagePath = path.join(__dirname, 'public', oldImage);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.warn('기존 이미지 삭제 실패:', err.message);
                    } else {
                        console.log('기존 이미지 삭제 완료:', imagePath);
                    }
                });
            }

            res.json({ message: '수정 완료' });
        });
    });
});


app.listen(port, () => {
    console.log('server ready');
})