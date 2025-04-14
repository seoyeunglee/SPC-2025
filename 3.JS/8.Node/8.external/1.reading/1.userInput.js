// npm install readline

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, // 표준 입력(키보드 입력)
    output: process.stdout // 표준 출력(콘솔 출력)
});

// console.log('입력전'); → 바로 출력됨
// rl.question(...)은 비동기(asynchronous) 함수이기 때문에, 사용자의 입력을 기다리는 동안 다음 줄이 먼저 실행됨
// 그래서 **'입력후'**가 먼저 출력되고, 사용자가 입력을 완료하면 그때 userKeyBoardInputHandler가 실행

console.log('입력전');

function userKeyBoardInputHandler(input){
    console.log('입력한 단은 : ', input);

    const num = parseInt(input);

    if(!isNaN(num) && num > 0 && num<10){
        for(let i=1; i<=9; i++){
            console.log(`${num} * ${i} = ${num * i}`);
        }
    }else {
        console.log('1에서 9까지의 숫자를 입력해주세요');
    }
    rl.close();
}

rl.question('구구단의 단을 입력하시오 : ', userKeyBoardInputHandler);

console.log('입력후');