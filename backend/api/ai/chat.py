import openai
import os

# OpenAIのAPIキーを取得
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# OpenAIのAPIのキーを設定
openai.api_key = OPENAI_API_KEY


# Chatを行うためのクラス作成
class Chatgpt:
    def __init__(self, system_setting, temperature=0.7):
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
    system_setting = """\
        ####Settings###
        You are a scholar who knows a lot about animals. You have a wealth of knowledge about what animals eat, where they live, and trivia about them.

        ######Status###.
        You are about to be asked a question by a curious user about what animals eat, where they live, and trivia about animals.

        ######Requirement###.
        Please answer the user's questions.

        Here are some examples

        Example 1
        user: Tell me what zebras eat.
        assistant: Zebras feed primarily on grasses, leaves, twigs, tree bark, and fruit. Because they live in grasslands and savannas, they subsist primarily on grasses. Occasionally, they chew on branches and bark to replenish their nutritional needs. Fruits vary depending on the time of year, but they prefer to eat mangoes, apples, and bananas.
        user:Tell mr where the zebras live.
        assistant:Zebras are found in the grasslands and savanna regions of Africa. Specifically, the Masai Mara and Serengeti in East Africa, Kruger National Park in South Africa, and Etosha National Park in Namibia are known as typical habitats.
        user: Tell us some interesting trivia about zebras.
        assistant: Zebras are believed to be the fastest runners compared to other herbivores living in the same savanna. Zebras have distinctive black and white stripes on their body surface, and the shape and size of the stripes are known to vary from individual to individual. Some believe that the stripes on zebras have the effect of keeping mosquitoes, flies, and other biting insects away. Zebras live in herds and are known to reciprocate each other's behavior within the herd. It is also believed that when on alert, the entire herd may change direction at once. Zebras are herbivores, feeding primarily on grasses and leaves. Zebras are found over a wide area of the African continent, although their populations are declining in some areas.

        Example 2
        user: Tell me what lions eat.
        assistant: They eat bamboo shoots and bamboo shoots as well as bamboo shoots and bamboo grass. It has been recorded that it sometimes catches and eats small animals such as insects.
        user:Tell mr where the lions live.
        assistant:Lions are found on the African continent and parts of India. On the African continent, they inhabit a wide range south of the Sahara Desert. Typical habitats include the Serengeti and Masai Mara in East Africa, Kruger National Park in South Africa, and the Okavango Delta in Botswana. In India, they are found in Gujarat, Rajasthan, Madhya Pradesh, Uttar Pradesh, and Himachal Pradesh. However, the Indian lion is globally listed as an endangered species and is currently protected in the Girard Lion Sanctuary in Gujarat.
        user: Tell us some interesting trivia about lions.
        assistant: The male lion's mane is known to vary in size and density depending on the individual's health and genetic factors. Lion males are larger and stronger because they are primarily engaged in hunting, but females play an important role in the actual hunting. Most lions are nocturnal and rest during the day. Lions spend roughly nearly 18 hours a day sleeping. The African species of lion is one of the largest cats, while the Indian species is somewhat smaller than the African species. Despite their large size, lions can run at speeds of over 60 kilometers per hour. Compared to other animals, including humans, lions have relatively short body hair, which allows them to better regulate their body temperature during the summer months.

        Example 3
        user: Tell me what giraffes eat.
        assistant: Giraffes are herbivores that feed primarily on tree leaves. Giraffes have very long necks that have evolved to reach the leaves of tall trees. Giraffes also occasionally eat tree bark, branches, and fruit. Although giraffes are herbivores, they will sometimes eat the bones of dead animals to replenish their bones and horns as needed.
        user:Tell mr where the giraffes live.
        assistant:Giraffes inhabit a wide range of habitats across the African continent. They inhabit a wide range of habitats, from tropical rainforests to savannas, where there are suitable forests and savanna grasslands.
        user: Tell us some interesting trivia about giraffes.
        assistant: Giraffes have seven neck bones, the same number as human neck bones, but each bone is more than 45 cm long on average. Giraffes are among the tallest land animals in existence, and can reach a height of 5 to 6 meters as adults. Utilizing their long necks and legs, giraffes can run at speeds of over 60 kilometers per hour. Giraffes are known to sleep for only 30 minutes to an hour at a time, requiring long periods of sleep to avoid nocturnal predator attacks. Compared to other animals sharing the same grasslands, giraffes are relatively calm and sociable, as they face fewer threats from large predators.
        """
    chatgpt = Chatgpt(system_setting)
    question_food = f"Tell us what {animal_name} eat."
    chatgpt.input_message(question_food)
    food = chatgpt.input_list[-1]["content"]
    question_area = f"Tell us where the {animal_name} live."
    chatgpt.input_message(question_area)
    area = chatgpt.input_list[-1]["content"]
    # question_trivia = f"Tell me some trivia about {animal_name}"
    question_trivia = f"""
    tell me some interesting tidbits about {animal_name}. Please output only bullet points as the output needs to be concise. The output should be bulleted and each sentence should end with an '\r\n'.
    Here are some examples
    - Pandas have a unique thumb-like structure on their front paws that helps them grasp bamboo.'\r\n'
    - They have a special digestive system that allows them to break down cellulose in bamboo.'\r\n'
    - Despite their large size and strength, pandas are very good tree climbers.
    - Pandas are known for their distinctive black and white markings, which help them blend in with their surroundings.'\r\n'
    - They are classified as a vulnerable species due to habitat loss and low birth rates.
    - Pandas have a very low reproductive rate, with females only giving birth to one cub every two to three years.'\r\n'
    - They have a special adaptation in their throat that allows them to vocalize in a way that helps them communicate with other pandas over long distances.'\r\n'
    - Pandas are considered to be a symbol of peace and friendship in Chinese culture.'\r\n'
    """
    chatgpt.input_message(question_trivia)
    trivia = chatgpt.input_list[-1]["content"]
    knowledge = {
        "name": animal_name,
        "food": food,
        "area": area,
        "mame": trivia,
    }
    return knowledge


# # contextからなんの動物か推論する
# def chat_inference(context):
#     """
#     _summary_ : contextからなんの動物かを推論する関数

#     Parameters
#     --------------------------------
#     context : string
#         画像を表現するテキスト

#     Returns
#     --------------------------------
#     output : string
#         テキストから推論した動物名

#     """

#     # Chatgptにシステム設定のためのプロンプト
#     system_setting = """\
#         ####Settings###
#         You are a scholar who knows animals.

#         ####Situation###
#         You receive a text from a user that describes an image of an animal

#         ####Request###
#         Please use the following format in your response
#         [name]: "animal name"
#         Please determine the animal most likely to be in the image based on the text you received from the user, step by step.
#         Please output the name of the animal you have determined according to the format.

#         Here are some examples

#         Example 1
#         user:a medium-sized dog breed with a short, white coat covered in black spots
#         assistant: [name] Dalmatian

#         Example 2
#         user: a black and white dog standing on top of a grass covered field, a picture by Toyen
#         assistant: [name] Shiba Inu

#         ###Note###
#         The answer absolutly must output only the animal name
#         """
#     # Chatgptクラスのインスタンス
#     chatgpt = Chatgpt(system_setting)
#     chatgpt.input_message(context)
#     animal_name = chatgpt.input_list[-1]["content"]
#     animal_name = animal_name[8:]
#     return animal_name


# # 動物名から食べるものを生成
# def chat_food(animal_name):
#     system_setting = """\
#         ####Settings###
#         You are a scholar who knows animals.

#         ####Situation###.
#         A question from a user who is curious about animals about what the animals eat

#         ####Request###.
#         Please answer the user's question.
#         Here are some examples

#         Example 1
#         user: Tell us where the lion live.
#         assistant: Eats large mammals such as zebras, wild boars, gnus, antelopes, etc.

#         Example 2
#         user: Tell us where the giant panda live.
#         assistant: They eat bamboo shoots as well as bamboo shoots and bamboo shoots. It has been recorded that they sometimes catch and eat small animals such as insects.
#         """
#     chatgpt = Chatgpt(system_setting)
#     question = "Tell us where the {animal_name} live."
#     chatgpt.input_message(question)
#     food = chatgpt.input_list[-1]["content"]
#     return food


# # 動物名から生態地域を生成
# def chat_area(animal_name):
#     system_setting = """\
#         ####Settings###
#         You are a scholar who knows animals.

#         ####Situation###.
#         A question from a user who is curious about animals about what the animals eat

#         ####Request###.
#         Please answer the user's question.
#         Here are some examples

#         Example 1
#         user: Tell us what lion eat.
#         assistant: Eats large mammals such as zebras, wild boars, gnus, antelopes, etc.

#         Example 2
#         user: Tell us what giant panda eat.
#         assistant: They eat bamboo shoots as well as bamboo shoots and bamboo shoots. It has been recorded that they sometimes catch and eat small animals such as insects.
#         """
#     chatgpt = Chatgpt(system_setting)
#     question = "Tell us what {animal_name} eat."
#     chatgpt.input_message(question)
#     area = chatgpt.input_list[-1]["content"]
#     return area


# # 動物名から豆知識を生成
# def chat_trivia(animal_name):
#     system_setting = """\
#         ####Settings###
#         You are a scholar who knows animals.

#         ####Situation###.
#         A user is curious about animals and asks you about animal trivia

#         ####Requirement###
#         Please answer the user's question.
#         Here are some examples

#         Example 1
#         user: Tell me some trivia about lions.
#         assistant: Lions spend most of the day sleeping. Lions originally spend 15 to 20 hours a day sleeping or lying down to relax. The success rate of temporary hunting is 20% to 30%. Hunting is not done every day, but every few days. In zoos, fasting days are set aside in accordance with wild ecology, and food is given every few days.

#         Example 2
#         user: Tell me some trivia about giant pandas.
#         assistant: Pandas are actually carnivores, and are classified in the Carnivora family. While herbivores have long intestines that are more than 20 times their body length,
#         the panda's intestines are about 4 times its body length. From this point of view, pandas are carnivores. Pandas spend much of the day eating, but only 20% of
#         the bamboo and bamboo grass they eat can be digested. Their eyes are surprisingly sharp and scary. They eat all day long.
#         """
#     chatgpt = Chatgpt(system_setting)
#     question = "Tell me some trivia about {animal_name}"
#     chatgpt.input_message(question)
#     trivia = chatgpt.input_list[-1]["content"]
#     return trivia


# # contextを受け取って動物を推論し生態と豆知識を返す関数(OpenAIからエラーが帰ってくる．多分アクセス過多)
# def chat(context):
#     animal_name = chat_inference(context)
#     food = chat_food(animal_name)
#     area = chat_area(animal_name)
#     trivia = chat_trivia(animal_name)
#     knowledge = {
#         "name": animal_name,
#         "food": food,
#         "area": area,
#         "trivia": trivia,
#     }
#     return knowledge


if __name__ == "__main__":
    output = chat_knowledge("dalmatian")
    print(output)
