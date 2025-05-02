document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('questionInput')){
        document.getElementById('sendButton').addEventListener('click', () => {
            askQuestion();
        });
        const q = askQuestion();
        showAnswer(q);
    }

});



async function askQuestion(){
    const question = document.getElementById('questionInput').value;
    
    const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ question }),
    });
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        // 실패
    }
    
    }

    function showAnswer(){
        const question = askQuestion();
        console.log(question);
        const answerDiv = document.getElementById('answer-container');
        answerDiv.innerHTML = question.answer;


    }
