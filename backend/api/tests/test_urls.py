from django.test import TestCase, Client
from django.urls import reverse


class TestURLs(TestCase):
    def setUp(self):
        self.client = Client()
        self.animal_url = reverse("api:animal")

    def test_animal(self):
        response = self.client.get(self.animal_url)
        self.assertEquals(response.status_code, 200)

