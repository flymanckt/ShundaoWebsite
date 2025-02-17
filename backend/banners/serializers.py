from rest_framework import serializers
from .models import HomepageCarousel, HomeContent, HomeContentSubtopic, SubtopicImage

class HomepageCarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageCarousel
        fields = ['id', 'title', 'image']

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
    # 生成可直接用于CSS的字段
    css_config = serializers.SerializerMethodField()    
    images = SubtopicImageSerializer(many=True)

    class Meta:
        model = HomeContentSubtopic
        fields = ['id', 'title_en', 'title_vi', 'content_en', 'content_vi', 'layout', 'effect', 'text_position', 'image_spacing', 'order', 'images','css_config' ]

    def get_css_config(self, obj):
        """返回前端可直接使用的CSS配置"""
        return {
            'layout_class': f"layout-{obj.layout}",
            'text_position_class': f"text-{obj.text_position}",
            'image_spacing_class': f"spacing-{obj.image_spacing}",
            'custom_spacing': self._get_spacing_value(obj.image_spacing)
        }

    def _get_spacing_value(self, spacing_key):
        """映射间距值"""
        spacing_map = {
            'tight': '8px',
            'normal': '16px',
            'loose': '24px'
        }
        return spacing_map.get(spacing_key, '16px')
    
class HomeContentSerializer(serializers.ModelSerializer):
    subtopics = HomeContentSubtopicSerializer(many=True)

    class Meta:
        model = HomeContent
        fields = ['id', 'title_en', 'title_vi', 'subtitle_en', 'subtitle_vi', 'content_en', 'content_vi', 'font', 'font_size', 'alignment', 'image', 'updated_at', 'subtopics']