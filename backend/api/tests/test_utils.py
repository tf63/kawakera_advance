from django.test import TestCase
from api.utils import get_words_tabs


class TestUtils(TestCase):
    def setUp(self):
        self.text = """0000
            1111
        0000"""

    def test_words_tabs_length(self):
        words, tab_counts = get_words_tabs(self.text)
        self.assertEqual(len(words), len(tab_counts))
