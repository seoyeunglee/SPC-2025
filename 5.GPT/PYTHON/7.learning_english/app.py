from flask import Flask, request, render_template, jsonify
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

client = OpenAI()

curriculums = {
    1: ["기초인사", "간단한 문장", "동물 이름"],
    2: ["학교생활", "가족 소개", "자기 소개"],
    3: ["취미와 운동", "날씨 묘사", "간단한 이야기"],
    4: ["쇼핑과 가격", "음식 주문", "여행 이야기"],
    5: ["역사와 문화", "과학과 자연", "사회 이슈"],
    6: ["미래 계획", "진로 탐색", "세계 여행"],
}

@app.route('/')
def home():
    return render_template('home.html', grades=curriculums.keys())

@app.route('/grade/<int:grade>')
def grade(grade):
    if grade in curriculums:
        curriculum_with_index = list(enumerate(curriculums[grade]))
        return render_template('grade.html', grade=grade, grades=curriculums.keys(), curriculums=curriculum_with_index)
    return '해당 학년은 존재하지 않습니다', 404

@app.route('/grade/<int:grade>/curriculum/<int:curriculum_id>', methods=['GET', 'POST'])
def curriculum(grade, curriculum_id):
    if grade in curriculums and 0 <= curriculum_id < len(curriculums[grade]):
        curriculum_title = curriculums[grade][curriculum_id]
        if request.method == 'POST':
            user_input = request.form['user_input']
            print('사용자입력값: ', user_input)
            print('커리큘럼 타이틀: ', curriculum_title)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": (
                        f"당신은 초등학교 {grade} 학년 학생을 지도하는 영어교사입니다."
                        f"학생이 {curriculum_title}에 대해서 학습할 수 있도록 도와주어야 합니다."
                        f"학생이 한국말로 질문을 하면 아주 따끔하게 혼을 내주어야 합니다."
                        f"학생이 한국말 하라고 하면 무조건 영어로만 대답해야 합니다. 절대로 영어로만 대답해야 합니다."
                        f"학생의 표현이 틀렸을 때 맞는 표현으로 고쳐서 다시 알려주어야 합니다."
                        )},
                    {"role": "user", "content": user_input}
                ],
                temperature=0.7
            )
            chat_response = response.choices[0].message.content.strip()
            print("챗봇입력값: ", chat_response)
            return jsonify({'response': chat_response})

        return render_template('curriculum.html', grade=grade, curriculum_title=curriculum_title)
    return '해당 커리큘럼은 존재하지 않습니다.', 404


if __name__ == '__main__':
    app.run(debug=True)