from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Record, Problem
from api.serializers import RecordSerializer


class RecordIntegrationTest(APITestCase):
    def setUp(self):
        # 必要なテストデータをセットアップ
        problem = Problem.objects.create(
            problem_name="Test Problem",
            language="python",
            length="short",
            words=["word1", "word2"],
            tab_counts=[1, 2]
        )
        self.problem_id = problem.id

    def test_save_and_retrieve_record(self):
        url = reverse("api:record")

        # テスト用のデータを作成
        data = {"problem":  self.problem_id, "correct": 1, "miss": 0, "time": 1}

        # レコードの保存
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Record created successfully.")

        # 保存したレコードの取得
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # レスポンスの内容を検証
        records = Record.objects.all().order_by("-id")[:30]
        serializer = RecordSerializer(records, many=True)
        self.assertEqual(response.data, serializer.data)
