# views.py
from rest_framework import viewsets
from shundao.models import HomepageCarousel, HomeContent  # 绝对导入
from shundao.serializers import HomepageCarouselSerializer, HomeContentSerializer  # 绝对导入

class HomepageCarouselViewSet(viewsets.ModelViewSet):
    queryset = HomepageCarousel.objects.all()
    serializer_class = HomepageCarouselSerializer

class HomeContentViewSet(viewsets.ModelViewSet):
    queryset = HomeContent.objects.all()
    serializer_class = HomeContentSerializer
