from django.db import models

# 轮播图模型
class HomepageCarousel(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='banners/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title or f"Carousel Image {self.id}"

# 首页内容模型
class HomeContent(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    content = models.TextField(blank=True)
    image = models.ImageField(upload_to='home/', blank=True, null=True)

    def __str__(self):
        return self.title

# Brand Advantage 主模型
class BrandAdvantage(models.Model):
    main_title = models.CharField(max_length=200, blank=True)
    main_content = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.main_title or f"BrandAdvantage {self.id}"

# 新增选项：用于子主题文字位置选择
POSITION_CHOICES = [
    ('left', 'Left'),
    ('right', 'Right'),
    ('top', 'Top'),
    ('bottom', 'Bottom'),
]

# 更新布局选择（包括堆叠与轮播）
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

# Brand Advantage 子主题模型，允许自定义文字位置和布局效果
class BrandAdvantageSubtopic(models.Model):
    brand_advantage = models.ForeignKey('BrandAdvantage', on_delete=models.CASCADE, related_name="subtopics")
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    layout = models.CharField(max_length=50, choices=LAYOUT_CHOICES, default='stacked')
    effect = models.CharField(max_length=50, choices=EFFECT_CHOICES, default='none')
    text_position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='right')
    # 新增字段，允许用户设置图片之间的间距（单位像素）
    image_spacing = models.IntegerField(default=10, help_text="Spacing in pixels between images")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

# 多张图片模型，用于 BrandAdvantageSubtopic，每张图片可自定义大小
class SubtopicImage(models.Model):
    subtopic = models.ForeignKey(BrandAdvantageSubtopic, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='brand_advantage_subtopics/')
    order = models.PositiveIntegerField(default=0)
    custom_width = models.IntegerField(null=True, blank=True, help_text="自定义宽度（像素），例如300")
    custom_height = models.IntegerField(null=True, blank=True, help_text="自定义高度（像素），例如200")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image {self.id} for {self.subtopic.title}"
