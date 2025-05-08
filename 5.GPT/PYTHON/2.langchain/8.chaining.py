from dotenv import load_dotenv

from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import CommaSeparatedListOutputParser

load_dotenv()

chat_prompt1 = ChatPromptTemplate.from_template(
    "너는 요리사야. 다음 질문에 대해서 답변해줘. \n\n[질문]: {input}"
)

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.5)

chain1 = chat_prompt1 | llm | RunnableLambda(lambda x : {"response": x.content.strip()})

response = chain1.invoke({"input": "김치는 어떻게 만들어?"})["response"]
print(response)

system_template= "너는 전문 번역가야. 다름 글을 보고 {input_language}로부터 {output_language}로 번역해야돼."
system_message_prompt = SystemMessagePromptTemplate.from_template(system_template)
human_message_prompt = HumanMessagePromptTemplate.from_template("{text}")

chat_prompt2 = ChatPromptTemplate.from_messages(
    [system_message_prompt, human_message_prompt]
)

chain2 = chat_prompt2 | llm | RunnableLambda(lambda x : {"response": x.content})

response2 = chain2.invoke({"input_language": "영어", "output_language": "한국어", "text": "Hello, how are you?"})["response"]
print(response2)

chain3 = chat_prompt2 | llm | CommaSeparatedListOutputParser()
response3 = chain3.invoke({"input_language": "영어", "output_language": "한국어", "text": "Hello, how are you?"})
print(response3)
