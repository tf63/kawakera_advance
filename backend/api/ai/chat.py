import openai
import os
import json

# OpenAIのAPIキーを取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# OpenAIのAPIのキーを設定
openai.api_key = OPENAI_API_KEY


# Chatを行うためのクラス作成
class Chatgpt:
    def __init__(self, system_setting, temperature=1):
        self.system = {"role": "system", "content": system_setting}
        self.input_list = [self.system]
        self.logs = []
        self.temperature = temperature

    def input_message(self, input_text):
        self.input_list.append({"role": "user", "content": input_text})
        result = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=self.input_list,
            temperature=self.temperature,
        )
        self.logs.append(result)
        self.input_list.append(
            {"role": "assistant", "content": result.choices[0].message.content}
        )


# 動物名から豆知識と食べ物，生態地域，豆知識を生成
def chat_knowledge(animal_name):
    """_summary_

    Args:
        animal_name: string

    Returns:
        dict: {"ecology":"", "trivia":"", "type": "",  "hp":"", "attack":"", "defense":"", "magic_attack":"", "magic_defense:"", "speed":""}
    """
    system_setting = """\
        ### setting ###
        You are a scholar who knows much about animals and a Pokémon lover.  You have a wealth of knowledge about what animals eat, where they live, and trivia about them. You are tempted to compare animals to Pokémon.

        ### status ###
        You receive the name of the animal from the user. You are to respond with the animal's food, place of residence, trivia, one or two types you think apply to it, and predict the base status. You are to respond with the animal's food, place of residence, trivia, the type, and the base status in JSON format {"ecology":"what animals eat, and where animals live", "trivia":"animal's trivia", "type": "the animal's type you think",  "hp":"", "attack":"", "defense":"", "magic_attack":"", "magic_defense:"", "speed":""} or {"type": "the first animal's type you think, the second animal's type you think",  "hp":"", "attack":"", "defense":"", "magic_attack":"", "magic_defense:"", "Speed":""}.

        ### Requirements ###
        Please answer the user's questions. You must output your answer in JSON format so the value is in Japanese.

        Here are some examples.

        Example 1
        user:cat
        assistant:{"ecology":"猫は世界中に広く分布し、個人宅飼いや野良猫として生活しています。主に肉食で、小型哺乳類や鳥類を食べます。", "trivia":"猫は一日の14〜16時間を寝て過ごしています。また、猫は舐めることで毛づくろいをし、体を清潔に保ちます。", "type":"ノーマル", "hp":"82", "attack":"55", "defense":37", "magic_attack":"39", "magic_defense:"76", "speed":"95"}.

        Example 2
        user:crocodile
        assistant:{"ecology":"ワニは世界の熱帯地方に広く分布しており、河川や湖沼などの、淡水や汽水域に生息しています。幼体は昆虫、小魚等を食べて育ちます。成体は肉食で、サワガニやカメ、水鳥等を食べます。", "trivia":"ワニは魚を捕まえるときに、口を大きく開けて威嚇する行動をとります。この時の口の大きさは、実際の飲み込める大きさの3倍もあるとされています。また、ワニは空気を貯めることができるため、30分以上も水中に潜ることができます。", "type":"じめん,あく", "hp":"95", "attack":"125", "defense":"100", "magic_attack":"55", "magic_defense:"75", "speed":"45"}

        Example 3
        user:elephant
        assistant:{"ecology":"象はアフリカ象、インド象に分かれ、アフリカやアジアに生息しています。日本では草食獣と思われますが、実際には鼻を使って木の皮、根、芽、果実等を食べます。", "trivia":"象の鼻は、とても力強く、木を引き抜いたり、川を渡りながら泳ぐことができます。象は非常に社交的で、親密な仲間とは、鼻を触れあわせたり、耳をたたいたり、尻尾を振ったりしてコミュニケーションをとります。", "type":"じめん", "hp":"150", "attack":"120", "defense":"120", "magic_attack":"50", "magic_defense:"60", "speed":"50"}

        Example 4
        user:lion
        assistant:{"ecology": "ライオンはアフリカ中部から南部、インドの一部に分布している。主に肉食であり、トナカイ、シマウマ、カバ、水牛等を狩っている。", "trivia":"ライオンの雄は、鬣毛と呼ばれるたてがみを持っています。鬣毛は仲間内での地位を誇示するためにも重要で、強く美しいものを持つ雄が群れをリードすることが多いです。", "type": "ノーマル,あく", "hp":"95", "attack":"150", "defense":"70", "magic_attack":"60", "magic_defense":"80", "speed":"120"}
    """
    chatgpt = Chatgpt(system_setting)
    chatgpt.input_message(animal_name)
    knowledge = chatgpt.input_list[-1]["content"]
    print(knowledge)
    # json decode
    json_ok = True
    try:
        output = json.loads(knowledge)
    except json.JSONDecodeError:
        json_ok = False
        output = {
            "ecology": "",
            "trivia": "",
            "type": "",
            "hp": 1,
            "attack": 1,
            "defense": 1,
            "magic_attack": 1,
            "magic_defense": 1,
            "speed": 1,
        }
    items_int = ["hp", "attack", "defense", "magic_attack", "magic_defense", "speed"]
    items_str = ["ecology", "trivia", "type"]

    for item in items_str:
        try:
            output[item] = output[item]
        except (ValueError, KeyError):
            output[item] = ""
            json_ok = False

    for item in items_int:
        try:
            output[item] = int(output[item])
        except (ValueError, KeyError):
            output[item] = 1
            json_ok = False

    return json_ok, output


if __name__ == "__main__":
    animal = "eagle"
    output = chat_knowledge(animal)
    print(output)
    print(type(output))
