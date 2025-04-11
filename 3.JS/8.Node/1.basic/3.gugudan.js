function gugudan(){
    for(let j = 2; j <= 9; j++){
        console.log(`=====${j}단=====`);
        for(let i = 1; i <= 9; i++){
            console.log(`${j} x ${i} = ${j*i}`);
        }
    }
}
gugudan();