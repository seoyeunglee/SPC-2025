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

prompt = """
1. Find the list of public holidays in South Korea with their specific dates(month and date).
2. calculate the number of days until the next public holiday.
"""

result = agent.invoke({"input": prompt})
print(result["output"])
