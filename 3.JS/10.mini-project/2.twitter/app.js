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
        db.run('PRAGMA foreign_keys = ON');
    }else{
        console.log('DB연결 실패');
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
    secret: 'this-is-my-password',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
app.get('/tweet', (req, res) => res.sendFile(path.join(__dirname, 'public', 'tweet.html')));

app.get('/api/tweets', (req, res) => {
    const query = `
        SELECT tweet.*, user.username 
        FROM tweet 
        JOIN user ON tweet.user_id = user.id
        ORDER BY tweet.id DESC
    `;

    db.all(query, [], (err, tweets) => {
        if (req.session.user) {
            const userId = req.session.user.id;

            const queryLike = 'SELECT tweet_id FROM like WHERE user_id=?';
            db.all(queryLike, [userId], (err, likes) => {
                const likedTweetIds = likes.map(like => like.tweet_id);

                const result = tweets.map(tweet => ({
                    ...tweet,
                    liked_by_current_user: likedTweetIds.includes(tweet.id)
                }));
                res.json(result);
            })
        } else {
            res.json(tweets.map(tweet => ({...tweet, liked_by_current_user: false})));
        }
    })
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM user WHERE email=?';
    db.get(query, [email], (err, user) => {
        if (err || !user || user.password !== password) { 
            return res.status(401).json({'error': '로그인에 실패하였습니다.'});
        }
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        res.json({ message: '로그인 성공!' });
    })
});


app.post('api/logout', loginRequired, (req, res) => {
    req.session.destroy(() => {
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
        console.log(`등록완료 username: ${username}, email: ${email}, password: ${password}`)
    });
});

app.post('/api/tweet', loginRequired, (req, res) => {
    const {content} = req.body;

    const query = 'INSERT INTO tweet (content, user_id) VALUES (?, ?)';
    db.run(query, [content, req.session.user.id], (err) => {
        if(err){
            console.error(err.message);
            return res.status(500).json({error: '트윗 작성 실패'});
        }else{
            res.send({message:'작성완료'});
        }
    });
});

app.post('/api/like/:tweet_id', loginRequired, (req, res) => {
    const tweetId = req.params.tweet_id;

    const query = 'INSERT INTO like (user_id, tweet_id) VALUES (?, ?)';
    db.run(query, [req.session.user.id, tweetId]);

    const query2 = 'UPDATE tweet SET likes_count = likes_count + 1 WHERE id= ?';
    db.run(query2, [tweetId]);

    res.json({message: '성공'});
});

app.post('/api/unlike/:tweet_id', loginRequired, (req, res) => {
    const tweetId = req.params.tweet_id;
    const query = 'DELETE FROM like WHERE user_id=? AND tweet_id=?';
    db.run(query, [req.session.user.id, tweetId]);
    const query2 = 'UPDATE tweet SET likes_count = likes_count - 1 WHERE id=?';
    db.run(query2, [tweetId]);
    res.json({message: '성공'});
})

app.listen(port, () => {
    console.log('server ready');
});