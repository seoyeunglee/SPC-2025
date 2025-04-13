function leftTriangle() {
    const rows = 5;
    for(let i=0; i<=rows; i++){
        console.log("+".repeat(i));
    }
}
leftTriangle();

function leftIntervedTriangle(){
    const rows = 5;
    for(let i=rows; i>=1; i--){
        console.log("+".repeat(i));
    }
}
leftIntervedTriangle();

function rightTriangle(){
    const rows = 5;
    for(let i = 1; i <= rows; i++){
        const spaces = " ".repeat(rows - i);
        const stars = "+".repeat(i);
        console.log(spaces + stars);
    }
}
rightTriangle();

function rightInvertedTriangle(){
    const rows = 5;
    for(let i=0; i<rows; i++){
        const spaces = " ".repeat(i);
        const stars = "+".repeat(rows-i);
        console.log(spaces + stars);
    }
}
rightInvertedTriangle();

function doublesideTriangle(){
    const rows = 5;
    for(let i=0; i<rows; i++){
        const spaces = " ".repeat(rows - i - 1);
        const stars = "+".repeat(2 * i + 1);
        console.log(spaces + stars + spaces);
    }
}
doublesideTriangle();

function doublesideInvertTriangle(){
    const rows = 5;
    for(let i=0; i<rows; i++){
        const spaces = " ".repeat(i);
        const stars = "+".repeat(2 * (rows - i) -1);
        console.log(spaces+stars+spaces);
    }
}
doublesideInvertTriangle();