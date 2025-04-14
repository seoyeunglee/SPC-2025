
const fs = require('fs');

function myCallbackFunction(err, data){
    if(err){
        console.log('에러가 있음, 에러는 : ', err);
    }else{
        console.log('에러가 없음, 데이터는 : ', data);
    }
}

// fs.readFile('example.txt', (err, data));
fs.readFile('example.txt', 'utf8', myCallbackFunction);

/*
fs.readFile('example.txt', 'utf8', function(err, data){
    if(err){
        console.log('에러가 있음, 에러는 : ', err);
    }else{
        console.log('에러가 없음, 데이터는 : ', data);
    }
})
*/

/*
fs.readFile('example.txt', 'utf8', (err, data) => {
    if(err){
        console.log('에러가 있음, 에러는 : ', err);
    }else{
        console.log('에러가 없음, 데이터는 : ', data);
    }
})
*/