from django.test import TestCase
from rest_framework.test import APIClient
from api.models import Category

class CategoryAPITestCase(TestCase):
    fixtures = ['category.json']

    def setUp(self):
        self.client = APIClient()
        self.url = "/api/category/"

    def test_get_category_with_id(self):
        category1 = Category.objects.create(label="Category 1", trivia="Trivia 1", hp=1, attack=1, defense=1, speed=1, magic_attack=1, magic_defense=1, type="草", ecology="生態")
        category2 = Category.objects.create(label="Category 2", trivia="Trivia 2", hp=1, attack=1, defense=1, speed=1, magic_attack=1, magic_defense=1, type="草", ecology="生態")

        # テスト用のカテゴリIDを指定
        category_id = 1

        response = self.client.get(f"{self.url}?id={category_id}")

        self.assertEqual(response.status_code, 200)
        # レスポンスの内容を検証する

    def test_get_category_without_id(self):

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        # レスポンスの内容を検証する
        