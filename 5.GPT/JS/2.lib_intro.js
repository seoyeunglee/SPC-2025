const {OpenAI} = require('openai');
require('dotenv').config({path:'../.env'});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getGPTResponse(userInput){
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role:'system', content:'you are a highly skilled software engineer' }, // 가장 기본적인 시스템 프롬프트
            { role:'user', content: userInput }
        ],
        temperature: 0.7
    });
    return response.choices[0].message.content;
}

async function chatWithUser(){
    const userInput = 'js express 기능에 대해 설명해줘';
    const chatGPTResponse = await getGPTResponse(userInput);
    console.log('챗봇 응답: ', chatGPTResponse);
}
chatWithUser();
