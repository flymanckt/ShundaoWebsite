from django.test import TestCase
from ..banners.models import Product, News

class ProductModelTest(TestCase):
    def test_product_creation(self):
        product = Product.objects.create(name='Test Product', description='Test Description')
        self.assertEqual(product.name, 'Test Product')

class NewsModelTest(TestCase):
    def test_news_creation(self):
        news = News.objects.create(title='Test News', content='Test Content')
        self.assertEqual(news.title, 'Test News')
