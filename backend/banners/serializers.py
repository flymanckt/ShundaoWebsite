from rest_framework import serializers
from .models import HomepageCarousel, HomeContent, HomeContentSubtopic, SubtopicImage

class HomepageCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageCarousel
        fields = '__all__'

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

class HomeContentSubtopicSerializer(serializers.ModelSerializer):
    images = SubtopicImageSerializer(many=True)

    class Meta:
        model = HomeContentSubtopic
        fields = ['id', 'title_en', 'title_vi', 'content_en', 'content_vi', 'layout', 'effect', 'text_position', 'image_spacing', 'order', 'images']

class HomeContentSerializer(serializers.ModelSerializer):
    subtopics = HomeContentSubtopicSerializer(many=True)

    class Meta:
        model = HomeContent
        fields = ['id', 'title_en', 'title_vi', 'subtitle_en', 'subtitle_vi', 'content_en', 'content_vi', 'font', 'font_size', 'alignment', 'image', 'updated_at', 'subtopics']