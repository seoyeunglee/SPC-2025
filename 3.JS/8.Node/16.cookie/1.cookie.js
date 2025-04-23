const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    // res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.writeHead(200, {'Set-Cookie': 'yrnum: 1234'});
    res.end('쿠키받아가시오');
});

server.listen(3000, () => {
    console.log('server ready');
});