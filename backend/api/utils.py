import json
import os


def get_words_tabs(text):
    words = []
    tab_counts = []
    for i, w in enumerate(text.split("\n")):
        tab_count = 0
        w_striped = w.lstrip("\t")
        tab_count += len(w) - len(w_striped)
        w_striped = w_striped.lstrip(" ")
        tab_count += int((len(w) - len(w_striped)) / 4)

        words.append(w_striped)
        tab_counts.append(tab_count)

    return (words, tab_counts)


def update_fixture(fields, filename, modelname):
    filepath = os.path.join("fixtures", filename)

    # JSONファイルの読み込み
    with open(filepath, "r") as file:
        data = json.load(file)

    if not data:
        max_pk = 1
    else:
        max_pk = max(obj["pk"] for obj in data)

    new_data = {"model": modelname, "pk": max_pk + 1, "fields": fields}
    data.append(new_data)

    # JSONファイルへの保存
    with open(filepath, "w") as file:
        json.dump(data, file, indent=4)
