///// login /////
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
        console.log(data);
        showProfile();
        // return data.id;
    }else{
        // const data = await response.json();
        // console.log(data);
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
        // location.href="/home";
        showFlash(data.message, 'success');
        showProfile();
    }else{
        const data = await response.json();
        console.log('로그인실패');
        showFlash(data.error, 'danger');
    }
}

function showFlash(message, type='success'){
    const flashDiv = document.getElementById('flash-message');
    flashDiv.innerHTML = `
    <li id='mss' class="${type}">${message}</li>
    `;
}

function showProfile(){
    // document.getElementById('useremailSpan').textContent = email;
    document.getElementById('logoutnav').style.display= 'none';
    document.getElementById('loginnav').style.display= 'block';
    document.getElementById('like').style.display='block';
    document.getElementById('beforelogin').style.display='none';
}

function blindProfile(){
    document.getElementById('logoutnav').style.display= 'block';
    document.getElementById('loginnav').style.display= 'none';

}



///// tweets /////

document.addEventListener('DOMContentLoaded', async() => {
    const response = await fetch('/api/tweets');
    const data = await response.json();

    displayTweets(data);
});

function displayTweets(tweets){
    const tweetTableBody = document.querySelector('.tweet');
    console.log(tweets);
    tweets.forEach((tweet) => {
        const row = document.createElement('div');
        row.className = "tweet-body-row";
        row.innerHTML = `
        <p class="tweet-content">${tweet.content}</p>
        </div>
        <p class="tweet-author">- ${tweet.username} -</p>
        <div class="tweet-actions">
        <p id="beforelogin"><a href="/login">Log in to like</a></p>
        <form id="like" action="/tweet/like/" method="POST">
        <button type="submit">Like</button>
        </form>
        <form id="unlike" action="/tweet/unlike/" method="POST">
        <button type="submit">Unlike</button>
        </form>
        <span class="likes-count">Likes: ${tweet.likes_count}</span>
        </div></div>
        `
        tweetTableBody.appendChild(row);
        // console.log(tweet);
    });
}


///// register /////
// document.getElementById('register').addEventListener('click', () => {
//     registerInput();
// })

async function registerInput() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const RformData = new FormData();
    RformData.append('username', username);
    RformData.append('email', email);
    RformData.append('password', password);

    try{
        const res = await fetch('/api/registerInput', {
            method: 'POST',
            body: RformData
        });
        if(res.ok) location.href('/home');
    }catch(err){
        console.log(err.message);
    }
    
}


///// tweet /////

async function tweetInput(){
    const content = document.getElementById('content').value;
    // const userId = checkLoginStatus();
    // console.log(userId);
    
    try{
        const res = await fetch('/api/tweetInput', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
    }catch(err){
        console.log(err.message);
    }
    
}


