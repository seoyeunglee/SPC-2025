console.log('로딩완료');

// 미션 1. 백엔드에 요청해서 데이터를 받아와서, 화면에 렌더링한다.
// 1-1. 백엔드에 요청한다 fetch
// 1-2. 데이터를 받아온다 res.xxxx
// 1-3. 화면에 렌더링 한다 dom.xxxx

fetch('/get-items')
.then((res) => res.json())
.then((data) => {
    console.log(data)
    const myContainer = document.getElementById('scroll-container');
    const item = document.createElement('div');
    item.textContent = data;
    myContainer.appendChild(item);
});


