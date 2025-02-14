from rest_framework import viewsets
from .models import HomepageCarousel, HomeContent, BrandAdvantage
from .serializers import HomepageCarouselSerializer, HomeContentSerializer, BrandAdvantageSerializer

class HomepageCarouselViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomepageCarousel.objects.all().order_by('order')
    serializer_class = HomepageCarouselSerializer

class HomeContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeContent.objects.all()
    serializer_class = HomeContentSerializer

class BrandAdvantageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BrandAdvantage.objects.all()
    serializer_class = BrandAdvantageSerializer
