function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function mul(a,b){
    return a*b;
}
function div(a,b){
    if(!isFinite(a/b)){
        console.log('오류발생');
    }else{
        return a/b;
    }
}

function printScreen(text){
    console.log(text);
}

printScreen(add(2,3));
printScreen(sub(2,3));
printScreen(mul(2,3));
printScreen(div(2,3));

printScreen(mul(2,0));
printScreen(div(2,0));

