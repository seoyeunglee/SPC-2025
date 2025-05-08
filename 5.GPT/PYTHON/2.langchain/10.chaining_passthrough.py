from dotenv import load_dotenv

from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

load_dotenv()

chat_prompt1 = PromptTemplate(
    input_variables= ['product'] ,
    template="너는 회사 이름을 전문적으로 짓는 작명가야. 다음 상품/서비스를 갖는 회사명을 한개 지어줘. 상품명: {product} "
)

chat_prompt2 = PromptTemplate(
    input_variables= ["company_name"],
    # template="Write a catch phrase for the folloing company name: {company_name}"
    template="너는 회사 이름을 전문적으로 짓는 작명가야. 다음 회사명을 갖는 회사의 캐치프레이즈를 한개 지어줘. 회사명: {company_name} "
)

chat_prompt3 = PromptTemplate(
    input_variables= ["company_name"],
    template="이 회사를 잘 소개할 수 있는 소개 문장 글을 작성해줘. 500글자 정도 분량으로 소개해줘. 회사명: {company_name}, 슬로건: {catch_pharase} "
)

llm = OpenAI(model="gpt-3.5-turbo-instruct", temperature=0.9, max_tokens=1000)

chain1 = (
    {"product": lambda x: x["product"]}
      | RunnablePassthrough.assign(
        company_name=lambda x: llm.invoke(chat_prompt1.format(product=x["product"])).strip()
    ) | RunnablePassthrough.assign(
        catch_pharase=lambda x: llm.invoke(chat_prompt2.format(company_name=x["company_name"])).strip()
    ) | RunnablePassthrough.assign(
        description=lambda x: llm.invoke(chat_prompt3.format(company_name=x["company_name"], catch_pharase=["catch_pharase"])).strip()
    )
)

# response1 = chain1.invoke({"product": "김치"})["company_name"]
response1 = chain1.invoke({"product": "김치"})

print(f"회사이름: ", response1["company_name"])
print(f"최종캐치프라이즈:", response1["catch_pharase"])
print(f"회사 설명:", response1["description"])
