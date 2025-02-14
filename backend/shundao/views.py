from rest_framework import viewsets
from .models import HomepageCarousel, HomeContent, BrandAdvantage
from .serializers import HomepageCarouselSerializer, HomeContentSerializer, BrandAdvantageSerializer

class HomepageCarouselViewSet(viewsets.ModelViewSet):
    queryset = HomepageCarousel.objects.all()
    serializer_class = HomepageCarouselSerializer

class HomeContentViewSet(viewsets.ModelViewSet):
    queryset = HomeContent.objects.all()
    serializer_class = HomeContentSerializer

class BrandAdvantageViewSet(viewsets.ModelViewSet):
    queryset = BrandAdvantage.objects.all()
    serializer_class = BrandAdvantageSerializer
