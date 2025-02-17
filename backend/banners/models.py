from django.db import models

# 定义选择项
POSITION_CHOICES = [
    ('left', 'Left'),
    ('right', 'Right'),
    ('center', 'Center'),
    ('top', 'Top'),
    ('bottom', 'Bottom'),
]

LAYOUT_CHOICES = [
    ('vertical', '垂直布局'),
    ('horizontal', '水平布局'),
    ('grid-2', '双列网格')
]

EFFECT_CHOICES = [
    ('hover_zoom', 'Hover Zoom'),
    ('fade', 'Fade'),
    ('none', 'None'),
]

class HomepageCarousel(models.Model):
    title = models.CharField(max_length=200)
    image_url = models.URLField(max_length=200)
    image = models.ImageField(upload_to='homepage_carousel/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title

class HomeContent(models.Model):
    title_en = models.CharField(max_length=200)
    title_vi = models.CharField(max_length=200, blank=True)
    subtitle_en = models.CharField(max_length=300, blank=True)
    subtitle_vi = models.CharField(max_length=300, blank=True)
    content_en = models.TextField(blank=True)
    content_vi = models.TextField(blank=True)
    font = models.CharField(max_length=100, blank=True, help_text="字体，例如 'Roboto'")
    font_size = models.IntegerField(default=16, help_text="字体大小（px）")
    alignment = models.CharField(max_length=20, choices=[('left', 'Left'), ('center', 'Center'), ('right', 'Right')], default='left')
    image = models.ImageField(upload_to='home/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title_en or f"HomeContent {self.id}"

class HomeContentSubtopic(models.Model):
    home_content = models.ForeignKey(HomeContent, on_delete=models.CASCADE, related_name="subtopics")
    title_en = models.CharField(max_length=200)
    title_vi = models.CharField(max_length=200, blank=True)
    content_en = models.TextField(blank=True)
    content_vi = models.TextField(blank=True)
    layout = models.CharField(max_length=50, choices=LAYOUT_CHOICES, default='stacked',verbose_name="布局方式")
    effect = models.CharField(max_length=50, choices=EFFECT_CHOICES, default='none')
    text_position = models.CharField(max_length=10, choices=POSITION_CHOICES, default='right',verbose_name="文字位置")
    image_spacing = models.IntegerField(default=10, help_text="图片间距，单位像素")
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.title_en

class SubtopicImage(models.Model):
    subtopic = models.ForeignKey(HomeContentSubtopic, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='homepage_subtopics/')
    order = models.PositiveIntegerField(default=0)
    custom_width = models.IntegerField(null=True, blank=True, help_text="自定义宽度（像素）")
    custom_height = models.IntegerField(null=True, blank=True, help_text="自定义高度（像素）")
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"Image {self.id} for {self.subtopic.title_en}"