// npm install readline

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('입력전');

function userKeyBoardInputHandler(input){
    console.log('입력한 단은 : ', input);
    const num = parseInt(input);

    if(!isNaN(num) && num > 0 && num<10){
        for(let i=1; i<=num; i++){
            console.log(`${num} * ${i} = ${num * i}`);
        }
    }else {
        console.log('1에서 9까지의 숫자를 입력해주세요');
    }
    rl.close();
}

rl.question('구구단의 단을 입력하시오 : ', (input) => {
    console.log('입력한 단은 : ', input);

    rl.close();
});

console.log('입력후');