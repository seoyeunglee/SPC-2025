const http = require('http');

const server = http.createServer(); // 서버생성

server.on('request', (req, resp) =>{
    console.log('요청이 왔음');
    resp.writeHead(200);
    resp.end('Hello');
})

server.on('connection', () =>{
    console.log('연결이 되었음');
})

server.on('close', () => {
    console.log('연결이 종료되었음');
})

server.listen(3000);