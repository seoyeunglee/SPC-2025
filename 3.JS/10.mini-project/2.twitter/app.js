const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const sqlite = require('sqlite3');
const path = require('path');

const app = express();
const port = 3000;
const db = new sqlite.Database('tweet.db', (err) => {
    if (!err) {
        console.log('DB 연결 성공');
        db.run('PRAGMA foreign_keys = ON')
    }else{
        console.log()
    }
});

// 미들웨어 함수
function loginRequired(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({error: '로그인이 필요합니다'})
    };
    next();
}

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'password1234',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/tweet', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tweet.html')));

app.get('/api/tweets', (req, res) => {
    const query = 'SELECT content, u.username, likes_count from tweet t join user u on t.user_id = u.id ORDER BY t.id DESC';
    db.all(query, [], (err, rows) => {
        if(req.session.user){
            const userId = req.session.user.id;
            const queryLike = 'SELECT tweet_id FROM like WHERE user_id=?';
            db.all(queryLike, [userId], (err, likes) => {
                const likedTweetIds = likes.map(like => like.tweet_id);
            })
        }
        res.json(rows);
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM user WHERE email=? AND password=?';

    db.get(query, [email, password], (err, row) => {
        if (err) console.log('error');
        if (row) {
            res.session.user = {
                id: user.id,
                email: user.email,
                password: user.password
            };
            res.json({ message: '로그인성공' });
        } else {
            res.status(401).json({ message: '로그인실패' });
        }
    });
});

app.post('api/logout', (req, res) => {
    res.session.destroy(() => {
        res.json({message: '로그아웃 성공!'});
    });
});

app.get('/api/check-login', (req, res) => {
    console.log(req.session.user);
    const user = req.session.user;
    if (user) {
        res.json({ message: 'Welcome back', useremail: user.email });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});

app.post('/api/registerInput', (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO user(username, email, password) VALUES (?,?,?)';
    db.run(query, [username, email, password], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('db error');
        }
        // res.send(`등록완료 username: ${username}, email: ${email}, password: ${password}`);
        console.log(`등록완료 username: ${username}, email: ${email}, password: ${password}`)
    });
});

app.post('/api/tweetInput', (req, res) => {
    const {content} = req.body;

    const query = 'INSERT INTO tweet (content, user_id) VALUES (?, ?)';
    db.run(query, [content, req.session.user.id], (err) => {
        if(err){
            return res.status(500).json({error: '트윗 작성 실패'});
        }else{
            res.send({message:'작성완료'});
        }
    });
});

app.post('/api/like/:tweet_id', loginRequired, (req, res) => {
    const tweetId = req.params.tweet_id;
    const userId = req.session.user_id;
    const query = 'INSERT INTO like (user_id, tweet_id) VALUES (?, ?)';
    
    db.run(query, [userId, tweetId], (err) => {
        if(err){
            return res.status(500).json({error: '오류'});
        }else{
            res.send({message: '좋아요 누르기 성공'});
        }
    });
    
    const query2 = 'UPDATE tweet SET likes_count = likes_count + 1';
    db.run(query2, [tweetId]);
    
});

app.listen(port, () => {
    console.log('server ready');
});