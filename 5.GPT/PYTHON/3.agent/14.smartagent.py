from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain_core.runnables import RunnableLambda

# 1. 환경변수 로딩
load_dotenv()

# 2. LLM 모델 로딩
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

# 3. 외부 툴 로딩
tools = load_tools(["google-search"])

# 4. Agetn 정의 (ZeroShot + ReACT 프롬프트 기법을 사용해서 Agent 실행)
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True # 디버깅용 (추론하는 과정 출력)
)

# 5. 체인
def smart_old_router(input):
    user_input = input["input"]

    keywords = ["날씨", "검색", "오늘", "실시간", "뉴스", "가격", "환율"]
    if any(k in user_input for k in keywords):
        # print("[판단] Agent 사용 필요함")
        response = agent.invoke(input)
        return {"output": response}
    else:
        # 사용자의 질문에 따라서 판단을 어떻게 할지... 
        response = llm.invoke(user_input)
        # response = agent.invoke(input)
        # agent.invoke(input)
        return {"output": response.content.strip()}
    
def smart_new_router(input):
    user_input = input["input"]

    judge_prompt= f"""
    너는 사용자의 질문에 대해서 LLM에게 질문할지, 외부 툴(에이전트)를 통해서 질문할지 판단하는 시스템이야. 
    최신 정보를 요청하거나 니가 사전학습된 내용이 없는 질문이 있는 경우 에이전트를 통해서 외부 실시간 검색을 할 수 있어.
    오늘 같은 현재 시점을 물어보는 경우, 너의 모델에 해당 정보를 가져올 수 있는 정보가 없으니, 오늘을 가정해서 임의의 날짜로 설정해서 알려줘. 정확한 날씨 정보가 아니어도 공통된 키워드를 알려줘.
    그래서 사용자 질문을 보고 에이전트 필요성을 "Yes" 또는 "No" 로만 설명없이 대답해줘. 

    사용자 질문: {user_input}
    """
    judge_response =  llm.invoke(judge_prompt).content.strip().lower()
    print("[판단결과]", judge_response)
    if "yes" in judge_response:
        print("[판단] Agent 사용 필요함")
        response = agent.invoke(input)
        return {"output": response}
    else:
        response = llm.invoke(user_input)
        # agent.invoke(input)
        return {"output": response.content.strip()}
    
chain = RunnableLambda(smart_new_router)


# 6. 질문
inputs = [
    {"input": "서울의 오늘 날씨는 어때?"},
    {"input": "GPT-4o 모델의 특징이 뭐야?"},
    {"input": "2025년 미국 대통령은 누구야?"},
    {"input": "AI는 우리 삶에 어떤 영향을 줄까?"},
]

# 7. 답변 출력
for item in inputs:
    print(f"\n[질문] {item["input"]}")
    result = chain.invoke(item)
    print("[응답]", result["output"])
