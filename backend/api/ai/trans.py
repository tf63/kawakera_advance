import deepl
import os

# DeepLのAPIキーの取得
DEEPL_API_KEY = os.getenv("DEEPL_API_KEY")

# DeepLのTranslatorオブジェクトの作成
translator = deepl.Translator(DEEPL_API_KEY)


def deepl_translator(dictionary):
    """
    Translators

    Parameters
    ----------
    input : dictionary {key:value} (English)

    Returns
    -------
    output : dictionary {key:value}(Japanese)
    """

    for key in dictionary:
        dictionary[key] = str(
            translator.translate_text(dictionary[key], target_lang="JA")
        )
    return dictionary


if __name__ == "__main__":
    output = deepl_translator(
        {
            "name": "dalmatian",
            "food": "Dalmatians are a breed of dog and, like all dogs, they are omnivores, which means they eat both meat and vegetables. A healthy diet for a Dalmatian should consist mostly of high-quality dog food that contains all the necessary nutrients they need to stay healthy. They also require some vegetables and fruits in their diet, such as carrots, green beans, and apples, to provide them with vitamins and fiber. It is important to note that Dalmatians are prone to urinary tract problems, so it is crucial that they consume a diet that is low in purine. Therefore, it is necessary to avoid feeding Dalmatians foods that are high in purine, such as liver, kidney, and some types of fish.",
            "area": "Dalmatians are a breed of domestic dog and they are found all over the world as pets. However, the breed originated in Croatia, which was formerly part of Yugoslavia, and was named after the region of Dalmatia. The breed was originally used as a carriage dog, running alongside horse-drawn carriages, and also as a guard dog. Today, Dalmatians are popular pets and are known for their distinctive spotted coat and friendly, energetic personalities.",
            "mame": "Sure! Here are some interesting trivia about Dalmatians:\n\n1. Dalmatians are born without spots, and their spots usually appear within the first few weeks of their lives.\n\n2. Dalmatians are known for their endurance and can run long distances without getting tired. They were originally bred to trot alongside horse-drawn fire engines.\n\n3. Dalmatians have a strong prey drive and love to chase small animals such as squirrels and rabbits. Therefore, it is important to leash them when in public or in unfenced areas.\n\n4. Dalmatians have been used as carriage dogs, firehouse dogs, and circus dogs throughout history.\n\n5. Dalmatians are good swimmers and enjoy water activities. They were originally bred to work with boats and are still used today as water rescue dogs.\n\n6. Dalmatians have a unique urinary system that makes them prone to urinary stones. Therefore, it is important to keep them hydrated and feed them a low-purine diet to prevent health issues.\n\n7. Dalmatians are one of the few breeds that have pink, spotted skin.",
        }
    )
    print(output)
