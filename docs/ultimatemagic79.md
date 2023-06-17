# ultimatemagic79の作業記録
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
    の四つです．