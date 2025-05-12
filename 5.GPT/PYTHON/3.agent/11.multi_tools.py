# pip install langchain_community langchain_experimental
import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain_community.utilities import GoogleSerperAPIWrapper, GoogleSearchAPIWrapper, WikipediaAPIWrapper
from langchain_openai import ChatOpenAI
from langchain.chains import LLMMathChain
from langchain.tools import Tool
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner


load_dotenv()

google_api_key = os.getenv('GOOGLE_API_KEY')
google_cse_id = os.getenv('GOOGLE_CSE_ID')

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

llm_math_chain = LLMMathChain.from_llm(llm=llm, verbose=True)
search = GoogleSearchAPIWrapper()
wikipedia = WikipediaAPIWrapper()

tools = [
    Tool(
        name = "Search",
        func = search.run,
        description="Useful for answering questions using Google Search."
    ),
    Tool(
        name = "Wikipedia",
        func = wikipedia.run,
        description="Useful for looking up facts and statistics."
    ),
    Tool(
        name = "Calculator",
        func = llm_math_chain.run,
        description="Useful for answering math-related questions or calculation."
    ),
]

planner = load_chat_planner(llm)
executor = load_agent_executor(llm, tools, verbose=True)

agent = PlanAndExecute(planner=planner, executor=executor, verbose=True)

prompt = "오늘의 년월일을 확인한 다음에, 다음 하계 올림픽을 개최할 나라를 알려줘."
result = agent.invoke(prompt)

print(result)