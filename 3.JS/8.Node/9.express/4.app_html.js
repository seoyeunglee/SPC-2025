const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const data = fs.readFileSync('index.html', 'utf-8');

app.get('/', (req, res) => {
    console.log(`파일읽기 : ${res}`);
    res.send(data);
});

// app.get('/', (req,res) => {
//     res.send(`
//         <html>
//             <head>
//                 <title>헬로우 익스프레스</title>
//             </head>
//             <body>
//                 <h1>헬로우 익스프레스 !</h1>
//                 <h2>헬로우 익스프레스 !</h2>
//                 <h3>헬로우 익스프레스 !</h3>
//             </body>
//         </html>
//         `);
// });

app.listen(port, () => {
    console.log('server ready');
});