//const result = someVariableName * 2;

try{
    const result = someVariableName * 2;
}catch(error){
    console.log('오류가 발생했음: ', error.message);
}
console.log('계속 진행중...');

try{
    const result = someVariableName * 2;
}catch(error){
    if(error instanceof ReferenceError){
        console.log('참조 오류 발생: ', error.message);
    }else{
        console.log('그 외 다른 오류 발생: ', error.message);
    }
}

// 문법 오류 예시
try {
    eval("alert('Hello"); // 문법 오류
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log('문법 오류 발생:', error.message);
    } else {
        console.log('그 외 다른 오류 발생:', error.message);
    }
}


try {
    let arr = new Array(-1); // 음수 크기 → 범위 오류
} catch (error) {
    if (error instanceof RangeError) {
        console.log('범위 오류 발생:', error.message);
    } else {
        console.log('그 외 다른 오류 발생:', error.message);
    }
}

// 에러 만들기
function divide(a, b){
    if(typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('숫자를 입력하세요');
    }

    if((a.toString().length <= 2) || (b.toString().length <= 2)){
        throw new RangeError('2자리 숫자만 입력하시오.');
    }
    if(b === 0) throw new Error('0으로 나눌 수 없습니다.');
    return a/b;
}

try{
    result = divide(999,0);
} catch(error){
    console.log('오류발생: ', error.message);
}