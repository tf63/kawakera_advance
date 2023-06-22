from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from api.models import Category

class TriviaAPITestCase(APITestCase):
    fixtures = ['category.json']
    
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("api:trivia")

    def test_get_trivia(self):

        # テスト用のカテゴリを作成
        category1 = Category.objects.create(label="Category 1", trivia="Trivia 1", hp=1, attack=1, defense=1, speed=1, magic_attack=1, magic_defense=1, type="草", ecology="生態")
        category2 = Category.objects.create(label="Category 2", trivia="Trivia 2", hp=1, attack=1, defense=1, speed=1, magic_attack=1, magic_defense=1, type="草", ecology="生態")
        # 他のカテゴリも作成...

        # GETリクエストを実行
        response = self.client.get(self.url)

        # レスポンスの検証
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("trivia", response.data)

        trivia_data = response.data["trivia"]
        self.assertEqual(len(trivia_data), 10)  # 10個のトリビアが含まれているか確認

        # それぞれのトリビアについてラベルとトリビアの正しさを検証
        for trivia in trivia_data:
            self.assertIn("label", trivia)
            self.assertIn("trivia", trivia)
            self.assertTrue(Category.objects.filter(label=trivia["label"], trivia=trivia["trivia"]).exists())



