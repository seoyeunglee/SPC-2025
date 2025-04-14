const fs = require('fs');

console.log('파일쓰기전');
const data = "내가 쓰고 싶은 내용 블라블라블라";

fs.writeFileSync('example.txt', data, {encoding:'utf8', flag:'a'});

console.log('파일쓴후');