from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api.models import Problem


class RecordAPIViewTestCase(APITestCase):
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

    def test_create_record_success(self):
        url = reverse("api:record")

        data = {"problem": self.problem_id, "correct": 1, "miss": 0, "time": 1}

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Record created successfully.")

    def test_create_record_invalid_data(self):
        url = reverse("api:record")

        # 欠けたデータ
        invalid_data = {"correct": 1, "time": 1}
        response = self.client.post(url, invalid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
