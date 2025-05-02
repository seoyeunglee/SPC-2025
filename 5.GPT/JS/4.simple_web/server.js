const express = require('express');
const morgan = require('morgan');
const OpenAI = require('openai');
require('dotenv').config({path:'../../.env'});

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/api/ask', (req, res) => {
    const {question} = req.body;
    console.log(question);
});

app.post('/api/sendQuestionStream', async(req, res) => {
    const {question} = req.body;
    console.lpog('Received question:', question);

    res.setHeader('Content-Type', 'text/event-stream');

    try{
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: question }
            ],
            stream: true,
        });
        for await(const chunk of response) {
            const content = chunk.choices[0].delta.content || '';
            res.write(`data: ${JSON.stringify({content})}\n\n`);
        }
    res.write('data: [DONE]\n\n');
    }catch(error){
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

