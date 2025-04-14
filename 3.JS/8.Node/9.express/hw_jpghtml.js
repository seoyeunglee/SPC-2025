const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// public 파일 안의 정적 파일 제공 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'jpgtest.html'); // 절대경로
    res.sendFile(htmlFilePath);
});

app.listen(port, () => {
    console.log('서버 레디');
});

// project-root/
// ├── server.js            // Express 서버 코드
// ├── jpgtest.html         // 클라이언트에게 보여줄 HTML
// └── public/              // Express가 정적 파일을 제공하는 폴더
//     └── images/          // 이미지 파일을 담는 하위 폴더
//         └── cat1.png     // 실제 보여줄 이미지