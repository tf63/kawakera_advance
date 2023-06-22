from django.test import TestCase, Client
from django.urls import reverse


class TestURLs(TestCase):

    def setUp(self):
        self.client = Client()
        self.image_url = reverse("api:image")

    def test_image(self):
        # getは許していない
        response = self.client.get(self.image_url)
        self.assertEquals(response.status_code, 405)
