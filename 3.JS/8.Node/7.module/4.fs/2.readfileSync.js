const fs = require('fs');

console.log('파일읽기전');

const data = fs.readFileSync('example.txt', {encoding:'utf8', flag:'r'});

console.log(data);
console.log('파일읽기후');