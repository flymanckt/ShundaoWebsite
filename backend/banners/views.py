from rest_framework import viewsets
from .models import HomepageCarousel, HomeContent, HomeContentSubtopic
from .serializers import HomepageCarouselSerializer, HomeContentSerializer, HomeContentSubtopicSerializer

class HomepageCarouselViewSet(viewsets.ModelViewSet):
    queryset = HomepageCarousel.objects.all()
    serializer_class = HomepageCarouselSerializer

class HomeContentViewSet(viewsets.ModelViewSet):
    queryset = HomeContent.objects.all()
    serializer_class = HomeContentSerializer

class HomeContentSubtopicViewSet(viewsets.ModelViewSet):
    queryset = HomeContentSubtopic.objects.all()
    serializer_class = HomeContentSubtopicSerializer