const stringNumber = '42';

console.log(stringNumber + 2);

const number = parseInt(stringNumber);

console.log(number + 2);

console.log(typeof stringNumber);
console.log(typeof number);

const number2 = Number(stringNumber);
console.log(number2);
console.log(typeof number);

const user = {
    name : 'John',
    age : 30
}

console.log(typeof User);

setTimeout(() => {
    console.log('1초 후에 출력됨');
}, 1000);

console.log('끝');

const timerId = setTimeout(()=>{
    console.log('3초 후에 출력됨');
}, 3000);

console.log('진짜끝');
// console.log('타이머 ID : ',timerId);
clearTimeout(timerId);


