function increment(){
    console.log("증가버튼클릭");
    var result = document.getElementById("result");
    result.innerText = Number(result.innerText)+1;
    console.log(result);
}
function decrement(){
    console.log("감소버튼클릭");
    var result = document.getElementById("result");
    result.innerText = Number(result.innerText)-1;
    console.log(result);

    //숙제1 : 감소할 때 0 이하로 안내려가게 만들기 
    
}