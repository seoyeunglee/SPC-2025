let start = 0;
let count = 20; // NUM_OF_ITEMS_PER_PAGE
let end = start + count;

// console.log('로딩완료');

// 미션 1. 백엔드에 요청해서 데이터를 받아와서, 화면에 렌더링한다.
// 1-1. 백엔드에 요청한다 fetch
// 1-2. 데이터를 받아온다 res.xxxx
// 1-3. 화면에 렌더링 한다 dom.xxxx

async function loading() {
    const res = await fetch(`/get-items?start=${start}&end=${end}`);
    const data = await res.json();

    const myContainer = document.getElementById('scroll-container');

    data.forEach((d) => {
        const item = document.createElement('div');
        item.textContent = d;
        item.classList.add('item');
        myContainer.appendChild(item);
    })
    // 다음 로딩 준비..
    start = end;
    end += count;
}

document.addEventListener('DOMContentLoaded', () => {
    loading(start,end);
});

window.addEventListener('scroll', () => {
    console.log('윈도우높이 : ', window.innerHeight);
    console.log('스크롤위치 : ', window.scrollY);
    const endOfScroll = (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight);
    if(endOfScroll){
        // start += 20; // end += 20;
        loading();
    }
})