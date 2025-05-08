from dotenv import load_dotenv

from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda

load_dotenv()

chat_prompt1 = PromptTemplate(
    input_variables= ['product'] ,
    template="너는 회사 이름을 전문적으로 짓는 작명가야. 다음 상품/서비스를 갖는 회사명을 지어줘. 상품명: {product} "
)

chat_prompt2 = PromptTemplate(
    input_variables= ["company_name"],
    # template="Write a catch phrase for the folloing company name: {company_name}"
    template="너는 회사 이름을 전문적으로 짓는 작명가야. 다음 회사명을 갖는 회사의 캐치프레이즈를 지어줘. 회사명: {company_name} "
)

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9)

chain1 = (
    chat_prompt1 | llm | RunnableLambda(lambda x : {"company_name": x.strip()}) |
    chat_prompt2 | llm | RunnableLambda(lambda x : {"catch_phrase": x.strip()})
)

# response1 = chain1.invoke({"product": "김치"})["company_name"]
response1 = chain1.invoke({"product": "김치"})["catch_phrase"]

print(response1)
