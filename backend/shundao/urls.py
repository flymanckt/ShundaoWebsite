from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomepageCarouselViewSet, HomeContentViewSet, BrandAdvantageViewSet

router = DefaultRouter()
router.register(r'homepage_carousel', HomepageCarouselViewSet)
router.register(r'homecontent', HomeContentViewSet)
router.register(r'brand_advantage', BrandAdvantageViewSet)

urlpatterns = router.urls
