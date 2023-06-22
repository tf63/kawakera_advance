# ViT model of Google
# classify to 1000 ImageNet classes
import requests
import os
import base64

from .transdata import np2binary, binary2np

API_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224"
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}


def image_classification(data):
    """_summary_

    Args:
        data : binary data


    Returns:
        score, label : integer(検出値を100かけしてint型に), string(一番予測値の大きいクラスラベル)
    """

    # huggingfaceに送る
    response = requests.post(API_URL, headers=headers, data=data)

    status = response.status_code
    if status == 200:
        response_json = response.json()
        # score(level)の算出
        score = response_json[0]["score"] * 100
        score = int(score)
        # labelの吐き出し
        label = response_json[0]["label"].split(",")[0].strip()
    else:
        score = 1
        label = ""

    return status, score, label


if __name__ == "__main__":
    # animalの指定
    animal = "lion"
    ends = ["jpg", "jpeg", "png"]
    for end in ends:
        filename = f"mediafiles/tests/animals/{animal}.{end}"
        if os.path.isfile(filename):
            with open(filename, "rb") as f:
                data = f.read()
            break

    # trans numpy
    data = binary2np(data)
    # classification
    score, label = image_classification(data)

    print(score, label)
