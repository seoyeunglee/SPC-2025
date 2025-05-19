# pip install anthropic
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")

client = anthropic.Anthropic(api_key=api_key)

message = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1000,
    temperature=0.7,
    messages=[
        {"role":"user", "content":"GPT란 무엇인지 가장 간단한 주요기능을 알려줘."}
    ]
)

print(message.content[0].text)