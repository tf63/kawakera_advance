# ViT model of Google
# classify to 1000 ImageNet classes
import requests
import os

API_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224"
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}


def image_classification(filename):
    """_summary_

    Args:
        filename (_type_): _description_

    Returns:
        _type_: _description_
    """
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    response_json = response.json()
    output = response_json[0]["label"].split(",")[0]
    return output


if __name__ == "__main__":
    output = image_classification("../docs/img/dal.jpg")
    print(output)
