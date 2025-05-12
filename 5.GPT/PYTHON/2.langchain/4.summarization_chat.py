from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

from langchain_core.runnables import RunnableLambda

load_dotenv()

template = "다음의 글을 3문장으로 요약하시오.:\n\n 각 줄은 50글자 이하로 작성하시오. \n 본문: {article}"

prompt = ChatPromptTemplate.from_messages(
    [
    HumanMessagePromptTemplate.from_template(template)
    ]
)

# gpt-3.5-turbo, gpt-4o, gpt-4o-mini 모델 바꿔보기..
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.5)

chain = prompt | llm | RunnableLambda(lambda x: {"summary": x.content.strip()}) # 기존 x 에서 chat 모드에서는 .content에 담겨서 옴.

input_text = {
    "article": """
우주 천문학은 지구 밖의 천체와 현상을 연구하는 학문으로, 별, 행성, 혜성, 은하, 블랙홀, 중성자별, 우주배경복사(CMB) 등 우주의 다양한 구성 요소를 관측하고 분석합니다. 특히 지상 망원경의 한계를 극복하기 위해 개발된 우주 망원경(예: 허블, 제임스 웹)은 대기의 영향을 받지 않고 외계 은하나 초기 우주의 모습을 정밀하게 관측할 수 있게 했습니다.
현대 우주 천문학은 관측 방법에 따라 파장별 분과로 나뉘는데, 광학 천문학은 가시광선 영역을, 적외선 천문학은 차가운 천체의 열 복사를, 엑스선 및 감마선 천문학은 고온의 격렬한 사건(예: 블랙홀 주변, 초신성 폭발)을 연구합니다. 각 파장은 서로 다른 우주의 정보를 담고 있어, 복합적으로 활용할 때 더욱 풍부한 이해가 가능합니다.
중력파 천문학은 2015년 LIGO가 처음으로 중력파를 검출하면서 새롭게 등장했습니다. 이는 블랙홀이나 중성자별이 충돌할 때 발생하는 시공간의 파동으로, 빛이 닿지 못하는 우주의 영역을 탐사할 수 있게 해 줍니다.
또한, 우주 초기 상태를 보여주는 우주 마이크로파 배경복사(CMB)는 빅뱅 직후 우주의 온도와 밀도 분포를 보여주며, 우주의 나이(약 137억 년), 밀도, 구성 요소(암흑물질, 암흑에너지) 등을 밝히는 핵심 단서입니다.
우주 천문학은 기술, 물리학, 수학, 전산학 등 다양한 분야와 융합되어 발전하며, 인간이 우주의 기원, 구조, 진화, 궁극적인 운명을 이해하는 데 필수적인 과학 분야입니다.
"""
}

result = chain.invoke(input_text)

print(f"최종결과: {result['summary']}")
