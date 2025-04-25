
document.addEventListener('DOMContentLoaded', () =>{
    checkLoginStatus();
    document.getElementById('login').addEventListener('click', (e) => {
        e.preventDefault();
        login();
    })
});

async function checkLoginStatus(){
    const response = await fetch('/api/check-login');
    if(response.status === 200){
        const data = await response.json();
        showProfile(data.email);
    }else{
        const data = await response.json();
        console.log(data);
        blindProfile();
    }
}


async function login(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if(response.status === 200){
        const data = await response.json();
        console.log('로그인성공');
        // showProfile(data.email);
        location.href="/home";
    }else{
        console.log('로그인실패');
    }
}

function showProfile(){
    // document.getElementById('useremailSpan').textContent = email;
    document.getElementById('logoutnav').style.display= 'none';
    document.getElementById('loginnav').style.display= 'block';
}

function blindProfile(){
    document.getElementById('logoutnav').style.display= 'block';
    document.getElementById('loginnav').style.display= 'none';

}

