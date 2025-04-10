
// DOM과 각종 필요한 여러 컴포넌트 로딩이 끝난 이후에 이거 실행해라... 
window.onload = initialize;

const GAME_SPEED = 200; // ms 화면 갱신 주기
const BLOCK_SIZE = 20;

let snake = {x:0, y:0}
let food = {x:100, y:100}
let direction = 'right';
let canvas = 0;

function initialize() {
    canvas = document.getElementById("snackCanvas");
    context = canvas.getContext('2d');

    // 키 이벤트 리스너 추가
    setupEventListeners();

    // 게임 시작 루프 호출
    setInterval(gameLoop, GAME_SPEED);

}
// 여기는 키보드 인터럽트(이벤트) 핸들러
function setupEventListeners(){

    // function keyHandler(ev){
    //     console.log("키보드 눌림", ev);
    // }
    document.addEventListener('keydown', (ev));
}

function gameLoop(){
    // console.log("게임 진행중...");
    // 뱀 이동
    moveSnake();

    // 화면 렌더링
    draw();
}
// 뱀의 위치를 이동한다
function moveSnake(){
    // snake.x += BLOCK_SIZE;
    switch(direction){
        
    }

    // 화면을 벗어나지 않게.. 오른쪽 끝 -> 왼쪽 끝에서 나오기 (vise versa)

}

// 화면에 뱀을 그린다
function draw(){
    // 화면 클리어 
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 뱀 그리기
    context.fillStyle = 'blue';
    context.fillRect(snack.x, snake.y, BLOCK_SIZE, BLOCK_SIZE);
    // 사과 그리기
    context.fillStyle = 'red';
    food.x = Math.floor(Math.random()*canvas.width/BLOCK_SIZE);
    context.fillRect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE);
}
