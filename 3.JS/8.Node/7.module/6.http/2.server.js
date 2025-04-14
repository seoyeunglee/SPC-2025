const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("아나녕하세요");
});

server.listen(3000);