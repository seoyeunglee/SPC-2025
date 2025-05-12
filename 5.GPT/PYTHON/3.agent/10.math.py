from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-4")

tools = load_tools()

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

result = agent.invoke("123 * (4 + 5) 의 결과는?")
print(result['output'])

question = """
기차가 어둠을 헤치고 시속 80km로 달려서 2시간 반을 달렸어. 이 기차가 이동한 시간과 평균속도를 알려줘. 
"""



