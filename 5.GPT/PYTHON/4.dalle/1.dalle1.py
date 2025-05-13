import urllib.request
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

# 모델은 dall-e-2 or dall-e-3
# 사이즈 v2 : 최대 사이즈 1024x1024, 보통 512x512 ,,
#       v3 : 최소 사이즈 1024x1024

response = client.images.generate(
    model = "dall-e-3",
    prompt="apple",
    # size="512x512",
    size="1024x1024",
    # quality="standard",
    quality="hd",
    n=1
)

image_url = response.data[0].url
print(image_url)

# 이미지 다운로드
import urllib
urllib.request.urlretrieve(image_url, "DATA/generated_image.png")