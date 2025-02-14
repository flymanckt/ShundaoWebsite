from django.db import models

# 首页内容模型（支持双语和自定义样式）
class HomeContent(models.Model):
    # 标题及副标题双语
    title_en = models.CharField(max_length=200)
    title_vi = models.CharField(max_length=200, blank=True)
    subtitle_en = models.CharField(max_length=300, blank=True)
    subtitle_vi = models.CharField(max_length=300, blank=True)
    
    # 正文内容双语
    content_en = models.TextField(blank=True)
    content_vi = models.TextField(blank=True)
    
    # 样式属性
    font = models.CharField(max_length=100, blank=True, help_text="字体，例如 'Roboto'")
    font_size = models.IntegerField(default=16, help_text="字体大小（px）")
    alignment = models.CharField(max_length=20,
                                 choices=[('left', 'Left'), ('center', 'Center'), ('right', 'Right')],
                                 default='left')
    
    # 可选图片（上传在 media/home/ 目录下）
    image = models.ImageField(upload_to='home/', blank=True, null=True)
    
    def __str__(self):
        return self.title_en

# 轮播图模型
class HomepageCarousel(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='homepage_carousel/')
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title or f"Carousel Image {self.id}"

# 品牌优势主模型
class BrandAdvantage(models.Model):
    main_title_en = models.CharField(max_length=200, blank=True)
    main_title_vi = models.CharField(max_length=200, blank=True)
    main_content_en = models.TextField(blank=True)
    main_content_vi = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.main_title_en or f"BrandAdvantage {self.id}"

# 品牌优势子主题模型，支持自定义布局和文字样式、双语
POSITION_CHOICES = [
    ('left', 'Left'),
    ('right', 'Right'),
    ('top', 'Top'),
    ('bottom', 'Bottom'),
]

LAYOUT_CHOICES = [
    ('stacked', 'Stacked'),
    ('carousel', 'Carousel'),
    ('grid', 'Grid'),
    ('masonry', 'Masonry'),
]

EFFECT_CHOICES = [
    ('hover_zoom', 'Hover Zoom'),
    ('fade', 'Fade'),
    ('none', 'None'),
]

class BrandAdvantageSubtopic(models.Model):
    brand_advantage = models.ForeignKey(BrandAdvantage, on_delete=models.CASCADE, related_name="subtopics")
    title_en = models.CharField(max_length=200)
    title_vi = models.CharField(max_length=200, blank=True)
    content_en = models.TextField(blank=True)
    content_vi = models.TextField(blank=True)
    layout = models.CharField(max_length=50, choices=LAYOUT_CHOICES, default='stacked')
    effect = models.CharField(max_length=50, choices=EFFECT_CHOICES, default='none')
    text_position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='right')
    image_spacing = models.IntegerField(default=10, help_text="图片间距，单位像素")
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title_en

# 多张图片，用于 BrandAdvantageSubtopic
class SubtopicImage(models.Model):
    subtopic = models.ForeignKey(BrandAdvantageSubtopic, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='brand_advantage_subtopics/')
    order = models.PositiveIntegerField(default=0)
    custom_width = models.IntegerField(null=True, blank=True, help_text="自定义宽度（像素）")
    custom_height = models.IntegerField(null=True, blank=True, help_text="自定义高度（像素）")
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"Image {self.id} for {self.subtopic.title_en}"
