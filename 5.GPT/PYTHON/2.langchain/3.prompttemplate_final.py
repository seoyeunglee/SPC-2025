from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

# template = "You are a cunsiultant for new companies. What is good name for a {company} that makes {product}? Give me five and only five answers. answer in Korean."
template = "You are a cunsultant for new companies. What is good name for a {company} that makes {product}? Give me 3~5 answers. answer in Korean."

prompt = PromptTemplate(
    input_variables=["company", "product"],
    template=template,
)

llm = OpenAI(temperature=0.9)

chain = prompt | llm | RunnableLambda(lambda x: {"response": x.strip()})

inputs = {"company":"High Tech Company", "product":"Web Game"}
result = chain.invoke(inputs)

print(f"최종결과: {result['response']}")