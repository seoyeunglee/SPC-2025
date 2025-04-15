const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// public 파일 안의 정적 파일 제공 
// app.use(express.static(path.join(__dirname, 'public')));

// function myMiddleware(req, res, next){
//     console.log(`MyLog1 : ${req.method}, ${req.url}`);
//     next();
// }
// app.use(myMiddleware);

app.use((req, res, next)=>{
    console.log(`MyLog2 : ${req.method}, ${req.url}`);
    req.myData = 12345;
    req.requestTime = Date.now();
    next();
});

app.use((req, res, next)=>{
    const htmlFilePath = path.join(__dirname, 'public', 'index.html');
    console.log(`MyLog3 : ${req.method}, ${req.url}`);
    console.log(req.myData);
    const date = new Date(req.requestTime);
    console.log(`요청시간 : ${date.toLocaleString()}`);
    res.sendFile(htmlFilePath);
});


app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', 'jpgtest.html'); // 절대경로(absolute)
    res.sendFile(htmlFilePath);
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log('서버 레디');
});

// project-root/
// ├── server.js            // Express 서버 코드
// ├── jpgtest.html         // 클라이언트에게 보여줄 HTML
// └── public/              // Express가 정적 파일을 제공하는 폴더
//     └── images/          // 이미지 파일을 담는 하위 폴더
//         └── cat1.png     // 실제 보여줄 이미지