function leftTriangle() {
    const rows = 5;
    let currentRow = 1;
    while (currentRow <= rows) {
        let stars = "";
        let starCount = 1;
        while (starCount <= currentRow) {
            stars += "+";
            starCount++;
        }
        console.log(stars);
        currentRow++;
    }
}
leftTriangle();

function rightTriangle(){
    const rows = 5;
    let currentRow = 1;
    while(currentRow <= rows){
        
    }
}