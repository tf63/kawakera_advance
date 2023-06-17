# 担当
バックエンド

# 作業内容

## modelの作成 
- CategoryモデルとIndividualモデルの作成
- CategoryモデルとIndividualモデルのリレーションを設定

## APIViewの作成
### ImageAPIView
- モデルに各情報を保存できるようにした
- POSTリクエストからbase64でエンコードされた画像を取得し，DBに保存できるようにした
- 既出カテゴリかどうかの判定を可能にした

## その他
- utils.pyにbase64でエンコードされた画像の文字列からImageFieldに保存できる形に変換する関数を実装