from rest_framework import serializers
from .models import HomepageCarousel, HomeContent, BrandAdvantage, BrandAdvantageSubtopic, SubtopicImage

class HomepageCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageCarousel
        fields = '__all__'

class HomeContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeContent
        fields = '__all__'

class SubtopicImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubtopicImage
        fields = '__all__'

class BrandAdvantageSubtopicSerializer(serializers.ModelSerializer):
    images = SubtopicImageSerializer(many=True, read_only=True)
    class Meta:
        model = BrandAdvantageSubtopic
        fields = '__all__'

class BrandAdvantageSerializer(serializers.ModelSerializer):
    subtopics = BrandAdvantageSubtopicSerializer(many=True, read_only=True)
    class Meta:
        model = BrandAdvantage
        fields = '__all__'
