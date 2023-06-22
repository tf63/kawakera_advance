from django.test import TestCase
from api.models import Category, Individual

class CategoryModelTestCase(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            label="Category Label",
            hp=100,
            attack=50,
            defense=30,
            speed=70,
            magic_attack=80,
            magic_defense=60,
            type="Normal",
            trivia="Some trivia",
            ecology="Some ecology",
        )

    def test_category_label(self):
        self.assertEqual(str(self.category), "Category Label")

    def test_category_fields(self):
        self.assertEqual(self.category.hp, 100)
        self.assertEqual(self.category.attack, 50)
        self.assertEqual(self.category.defense, 30)
        self.assertEqual(self.category.speed, 70)
        self.assertEqual(self.category.magic_attack, 80)
        self.assertEqual(self.category.magic_defense, 60)
        self.assertEqual(self.category.type, "Normal")
        self.assertEqual(self.category.trivia, "Some trivia")
        self.assertEqual(self.category.ecology, "Some ecology")


class IndividualModelTestCase(TestCase):
    def setUp(self):

        self.category = Category.objects.create(
            label="Category Label",
            hp=100,
            attack=50,
            defense=30,
            speed=70,
            magic_attack=80,
            magic_defense=60,
            type="Normal",
            trivia="Some trivia",
            ecology="Some ecology",
        )

        self.individual = Individual.objects.create(
            category=self.category, image="image.jpg", score=80
        )

    def test_individual_score(self):
        self.assertEqual(str(self.individual), "80")

    def test_individual_fields(self):
        self.assertEqual(self.individual.category, self.category)
        self.assertEqual(self.individual.image, "image.jpg")
        self.assertEqual(self.individual.score, 80)