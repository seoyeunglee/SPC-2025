const fs = require('fs');
const http = require('http');

const data = fs.readFileSync('index.html', 'utf-8');
const server = http.createServer((_, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
});

server.listen(3000, () => {
    console.log("server ready on port 3000");
});