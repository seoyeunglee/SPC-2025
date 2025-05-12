import os
from dotenv import load_dotenv

from langchain.agents import initialize_agent, AgentType
from langchain_experimental.plan_and_execute import PlanAndExecute, load_agent_executor, load_chat_planner
from langchain_openai import ChatOpenAI
from langchain.tools import tool

load_dotenv()

# 나만의 도구 정의하기
# flask에서 라우터 정의하던거.. @app.. 데코레이터
# 나만의 툴도... @tool 이라는 데코레이터로 정의함.. 함수 안의 주석도 의미가 있는 주석임.. ㅏ이 함수의 역할을 자연어로 정의한 것..

@tool
def get_current_weather(location: str) -> str:
    weather_data = {
        "서울": "맑음, 기온 22도",
        "부산": "흐림, 기온 25도",
        "제주": "비, 기온 17도"
    }
@tool
def get_population(city:str) -> str:
    population_data = {
        "서울": "약 970만명",
        "부산": "약 340만명",
        "인천": "약 300만명",
        "대구": "약 100만명"
    }
    return population_data.get(city, f"{city}의 인구정보가 없습니다")

# 도구 일단 담아주기...
tools = [get_current_weather,  get_population]

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0) # agent와 연동할 때는 가능한한 창의력을 낮게 해서 예측 가능한 문장이 들어오게 함.

# 에이전트 초기화
agent = initialize_agent(
    tools = tools,
    llm = llm,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True,
)

result = agent.invoke({"input": "서울의 날씨는 어때? 그리고 인구는 몇명이야?"})
print("최종 결과: ", result)
