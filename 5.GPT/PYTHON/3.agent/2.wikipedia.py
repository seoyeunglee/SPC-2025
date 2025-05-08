from dotenv import load_dotenv

from langchain_openai import OpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType

# from langchain_community.tools.wikipedia import WikipediaQueryRun
# from langchain_community.utilities.wikipedia import WikipediaAPIWrapper

# wiki = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper(lang="ko"))

load_dotenv()

llm = OpenAI(temperature=0.0)

tools = load_tools(["wikipedia"])

agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

result = agent.invoke({"input": "인공지능의 역사에 대해서 간략히 설명해줘."})
print(result["output"])
