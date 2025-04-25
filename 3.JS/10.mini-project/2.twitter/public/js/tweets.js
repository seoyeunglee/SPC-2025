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
        <p class="tweet-author">- ${tweet.user_id} -</p>
        <div class="tweet-actions">
        <p><a href="/login">Log in to like</a></p>
        <span class="likes-count">Likes: ${tweet.likes_count}</span>
        </div></div>
        `
        tweetTableBody.appendChild(row);
        // console.log(tweet);

    })
}