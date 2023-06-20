# ultimatemagic79の作業記録
ai設計
- 6/14
  - .env.exampleにAPI＿KEYの欄を追加しました．
  - classifier.pyを追加し，画像分類モデルを使えるようにしました．   

- 6/17
  /feature/imageブランチで作業中
  - api/aiにaiモジュールを作成しています
    作成するモジュールは
    - classifier.py
      hugging faceのimage classificationモデルにapiを通してdataを送り，scoreとlabelを返す
    - segmantation.py
      hugging faceのimage segmentationモデルにapiを通してdataを送り，マスクで切り出した画像を返す
    - chat.py
    - trans.py
      chatGPTからの情報をDEEPLを通して日本語に翻訳する．
    の四つです．

- 6/19
  chat.pyのアップデートを行いました．
  動物のlabelが送られてくると，
  JSON format {"ecology":"what animals eat, and where animals live", "trivia":"animal's trivia", "type": "the animal's type you think",  "hp":"", "attack":"", "defense":"", "magic_attack":"", "magic_defense:"", "speed":""} or {"type": "the first animal's type you think, the second animal's type you think",  "hp":"", "attack":"", "defense":"", "magic_attack":"", "magic_defense:"", "Speed":""}.
  というJSON形式で返答してもらえるようなプロンプトを練り，実装しました．