from langchain_openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = OpenAI(temperature=0.7, max_tokens=1000)

def build_prompt(code):
    return(
        f"다음 소스코드를 보고, 당신의 의견을 말해주세요."
    )

def analyze(code):
    prompt = ChatPromptTemplate.from_messages([
        ("system", ""),
        ("user", "")
    ])