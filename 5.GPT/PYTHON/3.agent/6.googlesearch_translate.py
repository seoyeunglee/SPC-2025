from dotenv import load_dotenv

from langchain_openai import OpenAI

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools

from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda

load_dotenv()

llm = OpenAI()

tools = load_tools(['google-search'])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

result = agent.invoke({"input": "서울의 오늘 날씨는 어때?"})
print(result["output"])

template = "다음 문장을 한국어로 번역해줘: \n\n {sentence}"
prompt = PromptTemplate(input_variables=["sentence"], template=template)
llm = OpenAI(temperature=0.3,
             max_tokens=1024,
             )

chain = prompt | llm | RunnableLambda(lambda x: {'translated': x.strip()})

result = chain.invoke({'sentence':result["output"]})

print('한글번역본: ', result['translated'])