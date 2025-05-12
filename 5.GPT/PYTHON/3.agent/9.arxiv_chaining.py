from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda


load_dotenv()


llm_summary = ChatOpenAI(model="gpt-4o-mini", temperature=0.3) # 0.7..
llm_translate = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.3)

tools = load_tools(["arxiv"]) # 많은 외부 서비스는 대부분 API 키를 필요로함.. 위키피디아, arxiv는 키없이 가능한..

agent = initialize_agent(
    tools = tools,
    llm = llm_summary,
    agent = AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose = True # 생각 출력해주기.. 프로덕션에서는 꺼야함
)

# 번역 체인
# 1. 프롬프트 작성
translate_prompt = ChatPromptTemplate.from_template("다음 문장들을 한국어로 해석해줘. 논문 : {text}")

# 2. 체이닝 ('|')
translate_chain = translate_prompt | llm_translate | RunnableLambda(lambda x: {"korean": x.content.strip()})

full_chain = (
    RunnableLambda(lambda input: {"input": input["query"]})
    | RunnableLambda(agent.invoke)
    | (lambda x: {"text": x["output"]})
    | translate_chain
    # | RunnableLambda(lambda x: {"korean": x.content.strip()})
)

# 3. 체이닝을 실행(invoke)

result = full_chain.invoke({"query": "최근 프롬프트 엔지니어링 관련 논문을 찾아서 요약해줘. \n\n 요약 내용은 '제목', '저자', '내용요약' 구성으로 해줘."})


# 4. 결과 출력
print(result['korean'])


