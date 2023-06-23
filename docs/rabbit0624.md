## 作業内容
- バックエンド (API開発)

### ImageAPIViewの作成
- postメソッドが送られた時に CategoryテーブルとIndividualテーブルに値をそれぞれ保存できるようにした

``` python
class ImageAPIView(APIView):
    def post(self, request):
        data = request.data
        
        data_category = data
        #犬というフィールドがCategoryのテーブルに含まれていれば、保存を行わない
        exists = Category.objects.filter(label="dog").exists()
        if not exists:
            serializer_category = CategorySerializer(data=data_category)
            if serializer_category.is_valid():
                record_category = serializer_category.save()            
            else:
                return Response(serializer_category.errors, status=status.HTTP_400_BAD_REQUEST)
            
        # ラベルがdogのレコードを取得する
        record = Category.objects.get(label="dog")
        # そのレコードの主キーを取得する
        data_indvidual = {
                                "individual":record.pk,
                                "score": 110
                                }
        serializer_individual = IndividualSerializer(data=data_indvidual)
        
        if serializer_individual.is_valid():
            record_individual = serializer_individual.save()
            return Response({"message": "Record created successfully."})
        else:
            return Response(serializer_individual.errors, status=status.HTTP_400_BAD_REQUEST)
```

### ImageAPIviewの変更
- aiパッケージからモジュールをimportし使えるようにした

### TriviaAPIViewの作成
### category.jsonの作成