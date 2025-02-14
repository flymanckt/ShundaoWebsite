from rest_framework import serializers
from .models import HomepageCarousel, HomeContent, BrandAdvantage, BrandAdvantageSubtopic, SubtopicImage

class HomepageCarouselSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomepageCarousel
        fields = ['id', 'title', 'image_url', 'order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None

class HomeContentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HomeContent
        fields = ['id', 'title_en', 'title_vi', 'subtitle_en', 'subtitle_vi', 'content_en', 'content_vi',
                  'font', 'font_size', 'alignment', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.image.url) if obj.image else None

class SubtopicImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SubtopicImage
        fields = ['id', 'image_url', 'order', 'custom_width', 'custom_height']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class BrandAdvantageSubtopicSerializer(serializers.ModelSerializer):
    images = SubtopicImageSerializer(many=True)

    class Meta:
        model = BrandAdvantageSubtopic
        fields = ['id', 'title_en', 'title_vi', 'content_en', 'content_vi', 'layout', 'effect', 'text_position',
                  'image_spacing', 'order', 'images']

class BrandAdvantageSerializer(serializers.ModelSerializer):
    subtopics = BrandAdvantageSubtopicSerializer(many=True)

    class Meta:
        model = BrandAdvantage
        fields = ['id', 'main_title_en', 'main_title_vi', 'main_content_en', 'main_content_vi', 'updated_at', 'subtopics']
