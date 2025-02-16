from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomepageCarouselViewSet, HomeContentViewSet

router = DefaultRouter()
router.register(r'homepage_carousel', HomepageCarouselViewSet)
router.register(r'homecontent', HomeContentViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
