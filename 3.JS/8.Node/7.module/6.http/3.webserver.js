// 미션. 파일을 읽어서 그 내용을 전달하는 서버 만들기

// index.html 파일을 읽어서 변수에 담아두고
// req가 왔을 때, 그 변수의 내용을 전달한다.

// 모듈 불러오기
const fs = require('fs');
const http = require('http');

// 파일 읽기
const data = fs.readFileSync('index.html', {encoding:'utf-8', flag:'r'});
// 실제로는 예외처리 해줘야함.. 일단 지금은 무시 

// 웹 서버 만들기 
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
});

server.listen(3000, () => {
    console.log("서버가 3000번 포트를 잘 리슨하고 있습니다. 지금부터 사용자의 요청을 기다리겠습니다.");
});