function greet(name){
    const greeting = '안녕하세요. '+ name;
    return greeting;
}

function printScreen(text){
    console.log(text);
}

printScreen(greet('아이유'));

function add(a,b){
    return a + b;
}

add(5,7);

printScreen(add(5,7));

