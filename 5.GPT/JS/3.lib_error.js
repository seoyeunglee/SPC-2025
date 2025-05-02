const { OpenAI } = require('openai');
require('dotenv').config({ path: '../.env' });

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    console.log('API 키가 올바르게 설정되어 있지 않습니다.');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: apiKey
});



async function getGPTResponse(userInput) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'you are a highly skilled software engineer' }, // 가장 기본적인 시스템 프롬프트
                { role: 'user', content: userInput }
            ],
            temperature: 0.7
        });
        return response.choices[0].message.content;
    } catch (err) {
        const status = err.status;
        if (status === 429) {
            console.error('Error : 요청 한도 초과(크레딧 부족)');
        } else if (status === 401) {
            console.error('Error: 해당 키에 권한이 없습니다.');
        } else if (status === 403) {
            console.error('Error: 해당 모델을 사용할 권한이 없습니다.');
        } else {
            console.error(`Error: 알 수 없는 오류입니다. ${status} - ${error.body}`);
        }
    }
}

async function chatWithUser() {
    const userInput = '안녕 집에 가고싶어';
    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('챗봇 응답: ', chatGPTResponse);
}
chatWithUser();
