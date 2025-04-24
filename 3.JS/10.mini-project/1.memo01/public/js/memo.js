document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/memos');
    const data = await response.json();

    displayMemos(data);
})

function uploadPost() {
    console.log('click');
    inputmemo();
    location.reload();
}

async function inputmemo() {
    const title = document.getElementById('input-title').value;
    const message = document.getElementById('input-text').value;

    const response = await fetch('/api/input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, message })
    });
}

function displayMemos(memos) {
    const memoBody = document.querySelector('#card-list');
    memos.forEach((memo) => {
        const row = document.createElement('div');
        row.className = 'col-md-4';
        row.innerHTML = `
        <div class="card mb-4" id="card-${memo.id}">
        <div class="card-body">
        <p class="card-id">${memo.id}</p>
        <p class="card-title">${memo.title}</p>
        <p class="card-text">${memo.message}</p>
        <button class="btn btn-info" onclick="modifyPost(${memo.id})">수정</button>
        <button class="btn btn-warning" onclick="deletePost(${memo.id})">삭제</button>
        </div></div>
        `
        memoBody.appendChild(row);

    })
}

async function deletePost(id) {
    const response = await fetch(`/api/delmemo/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    const idData = await response.json();
    console.log(idData);

    if (response.ok) {
        const card = document.getElementById(`card-${id}`);
        card.parentElement.remove();
    }
}

function modifyPost(id) {
    const card = document.getElementById(`card-${id}`);
    const title = card.querySelector('.card-title').textContent;
    const message = card.querySelector('.card-text').textContent;
    card.innerHTML = `
        <div class="card mb-4" id="card_${id}">
        <div class="card-body">
            <input class="form-control mb-2" id="mod-title-${id}" value="${title}"></input>
            <input class="form-control mb-2" id="mod-text-${id}" value="${message}"></input>
            <button class="btn btn-primary" onclick="updatePost(event, ${id})">저장</button>
        </div></div>
        `
}

async function updatePost(event, id){
    event.preventDefault();

    const title = document.getElementById(`mod-title-${id}`).value;
    const message = document.getElementById(`mod-text-${id}`).value;

    try{
        const res = await fetch(`/api/editmemo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({title, message})
        });

        if(res.ok) location.reload();
    }catch(err){
        console.log(err.message);
    }

}
