const API_SERVER = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", function(){
    const chatbotIcon = document.getElementById('chatbotIcon'); 
    const chatbotWindow = document.getElementById('chatbotWindow'); 
    const closeChatbot = document.getElementById('closeChatbot'); 
    const sendMessage = document.getElementById('sendMessage'); 
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');

    chatbotIcon.addEventListener('click', function(){
        chatbotIcon.style.display = 'none';
        chatbotWindow.style.display = 'flex';
    });

    closeChatbot.addEventListener('click', function(){
        chatbotWindow.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });

    function addMessage(message, sender = 'user'){
        const messageElement = document.createElement('div');
        messageElement.innerHTML = sender === 'user'
        ? `<i class="bi bi-person"></i> ${message}`
        : `<i class="bi bi-robot"></i> ${message}`;
        messageElement.classList.add(sender);
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    sendMessage.addEventListener('click', handleUserMessage);

    chatbotInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter'){
            handleUserMessage();
        }
    });

    async function handleUserMessage(){
        const message = chatbotInput.value.trim();
        if(message){
            addMessage(message, 'user');
            chatbotInput.value = '';

            const response = await sendMessageToServer(message);
            console.log(response);
            if(response.type === 'text'){
                addMessage(response.content, 'bot');
            }else if(response.type === 'image'){
                addImage(response.content);
            }else{
                addMessage('error','bot');
            }
        }
    }

    async function sendMessageToServer(question){
        try{
            const response = await fetch(`${API_SERVER}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({question})
            });
            const data = await response.json();
            if(data.response_type === 'text'){
                return { type: 'text', content: data.answer};
            }else if(data.response_type === 'image'){
                return { type: 'image', content: data.image_url};
            }else {
                return { type: 'text', content: '알 수 없는 응답 형식'};
            }
        }catch(error){
            console.log('서버 연결 오류', error);
            return {type: 'text', content: '서버와 연결할 수 없습니다.'};
        }
    }


})