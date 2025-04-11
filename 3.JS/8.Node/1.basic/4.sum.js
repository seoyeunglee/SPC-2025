function sum_to_num(number){
    let sum = 0;
    for(let i = 1; i <= number; i++){
        sum += i;
    }
    // console.log(`${sum}`);
    console.log(`${number} 까지의 합산은 : ${sum}`);
}
sum_to_num(100);
//미션 1. 주어진 숫자까지의 합산을 구하시오..

sum_to_num(1000);
sum_to_num(10000);
sum_to_num(100000);
sum_to_num(1000000);
sum_to_num(10000000);
sum_to_num(1000000000);
