// 1. 저 영역을 클릭해서 창이 나오게
// 2. x 눌러서 창이 닫히게
// 3. send 버튼 통해서 백엔드로 사용자가 입력한 대화 내용 전송
// 4. 받아온 응답(에코메세지)를 대화창에 출력

const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotIcon = document.getElementById('chatbotIcon');
const closeChatbot = document.getElementById('closeChatbot');
const sendMessage = document.getElementById('sendMessage');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

const API_SERVER = 'http://127.0.0.1:5000'

chatbotIcon.addEventListener('click', () => {
    chatbotIcon.style.display = 'none';
    chatbotWindow.style.display = 'block';
})

closeChatbot.addEventListener('click', () => {
    chatbotIcon.style.display = 'flex';
    chatbotWindow.style.display = 'none';
})

function addMessage(message, sender = 'user') {
    const myMessage = document.createElement('div');
    myMessage.innerHTML = sender === 'user'
        ? `<i class="bi bi-person"></i> ${message}`
        : `<i class="bi bi-robot"></i> ${message}`;
        myMessage.classList.add(sender);
    chatbotMessages.appendChild(myMessage);

    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getInputFromYourSendMessage() {
    const question = chatbotInput.value;

    // 메세지 지우기 
    chatbotInput.value = '';
    addMessage(question, 'user');

    // 서버로 보낸다..
    const resp = await fetch(`${API_SERVER}/api/chat`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }), //"question": message
    });
    const result = await resp.json();
    console.log(result);

    addMessage(result.question, 'chatbot');
}

sendMessage.addEventListener('click', async () => {
    getInputFromYourSendMessage();
});

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('엔터 키 눌렸으니, 서버로 보내는 코드 짜기');
        getInputFromYourSendMessage();
    }
    // console.log('키보드');
});



