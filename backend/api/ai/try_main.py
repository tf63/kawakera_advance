from classifier import *
from segmentation import *
from transdata import *
from chat import *

if __name__ == "__main__":
    # animalの指定
    animal = "dal"
    ends = ["jpg", "jpeg", "png"]
    for end in ends:
        filename = f"mediafiles/tests/animals/{animal}.{end}"
        if os.path.isfile(filename):
            with open(filename, "rb") as f:
                data = f.read()
            break

    score, label = image_classification(data)
    print("score, label", score, label)
    seg_img = create_segmentation(data)
    seg_img.save(f"mediafiles/tests/animals/trysegmentation_{animal}.png")
    ans = chat_knowledge(label)
    print("ans", ans)
