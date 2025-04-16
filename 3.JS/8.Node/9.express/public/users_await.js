document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const userTable = document.getElementById('userTable');

    updateTable();

    form.addEventListener('submit', (event) => {
        console.group('버튼 클릭됨');
        event.preventDefault();
        const name = username.value;

        console.log('생성할 이름 : ', name);
        const res = awaitfetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })

        username.value = ''; // 입력란 비우기
        // location = location; // 주소창 리프레쉬
        updateTable();
    })

    /// 미션 1.. 입력이 끝났으면, 입력칸 클리어 하기
    /// 미션 2.. 입력이 끝났으면, 서버에 정보를 요청해서 화면에 표시하기
    /// 미션 3.. 사용자 목록에 "수정", "삭제" 버튼 추가하기
    /// 미션 4.. "삭제" 기능 구현
    /// 미션 5.. "수정" 기능 구현

    function createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    async function updateTable() {
        userTable.innerHTML = '';

        const res = await fetch('/users');
        const users = await res.json();


        for (const key in users) {
            const row = document.createElement('div');
            row.innerHTML = `
                        <strong>ID</strong> ${key},
                        <strong>Name</strong> ${users[key]}
                    `
            row.appendChild(createButton('수정', () => editUser(key)));
            row.appendChild(createButton('삭제', () => deleteUser(key)));

            userTable.appendChild(row);
        }

        function editUser(userId) {
            const newName = prompt('수정할 이름을 입력하세요.');
            //PUT
            try {
                const res = await fetch(`/users/${userId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName })
                });

                if (!res.ok) throw new Error('수정실패');
                alert('수정성공');
                updateTable();

            } catch (error) {
                alert('수정 중 오류 발생');
            }


        }

        async function deleteUser(userId) {
            const confirmDelete = confirm('정말로 삭제하시겠습니까?');
            if (confirmDelete) {
                try {
                    const res = await fetch(`/users/${userId}`, {
                        method: 'DELETE'
                    });

                    if (!res.ok) throw new Error('삭제 실패');
                    updateTable(); // 비동기 
                    alert('삭제 성공');

                } catch (error) {
                    console.log('삭제 중 오류 발생 : ', error);
                    alert('삭제 중 오류 발생');
                }

            }else {
                alert('장난치지마시오...');
            }
        }
    }
    });