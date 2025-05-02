const axios = require('axios');
require('dotenv').config({path:'../.env'}); //.env 파일 읽어서 메모리에 올리기

const openaiApikey = process.env.OPENAI_API_KEY;

console.log(openaiApikey);

// const url = 'https://api.openai.com/v1/responses'; // 문장 생성용 api.. 
const url = 'https://api.openai.com/v1/chat/completions';

async function getGPTResponse(){
    try{
    const response = await axios.post(url, {
        // 본문
            "model": "gpt-3.5-turbo",
            "messages": [
                { 'role':'system', 'content':'you are a helpful assistant.'}, // 가장 기본적인 시스템 프롬프트
                { 'role':'user', 'content':'겨울에 먹기 좋은 음식을 세 문장으로 각각 1, 2, 3으로 알려줘.'}
            ],
            temperature:0.1, // 정확도(창의성)
            top_p:0.9, // 확률 기반 토큰 선택 범위
            frequency_penalty:0.5, // 반복 억제
            presence_penalty:0.6, // 얼마나 새로운 주제를 가져올거냐 등등..
            max_tokens:1000, 
        },
        {
        // 헤더
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${openaiApikey}`
            }
        });
        return response.data.choices[0].message;
    }catch(err){
        console.error("Error:", err.response?.data || err.message);
    }
}
// const ai_response = getGPTResponse();
// console.log(ai_response);

(async () => {
    const ai_response = await getGPTResponse();
    console.log("GPT 응답:", ai_response);
})();
