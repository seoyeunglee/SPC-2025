function leftTriangle2(ROWS){
    for(i = 1; i <= ROWS; i++){
        let stars = "";
        for(j = 1; j <= i; j++){
            stars += "*";
        }
        console.log(stars);
    }
}
console.log();
leftTriangle2(5);


console.log('---');

function leftTriangle3(rows){
    for(let i = 1; i <= rows; i++){
        console.log('*'.repeat(i));
    }
}
    
leftTriangle3(3);
console.log('---');

function rightTriangle(rows){
    for(let i=1; i<= rows; i++){
        console.log(' '.repeat(rows-i) + '*'.repeat(i));
    }
}

rightTriangle(5);