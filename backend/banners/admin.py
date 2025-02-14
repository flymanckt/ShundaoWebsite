from django.contrib import admin
from .models import HomepageCarousel, HomeContent, BrandAdvantage, BrandAdvantageSubtopic, SubtopicImage

@admin.register(HomepageCarousel)
class HomepageCarouselAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')

@admin.register(HomeContent)
class HomeContentAdmin(admin.ModelAdmin):
    # 移除了 'language' 字段
    list_display = ('title_en', 'font', 'font_size', 'alignment')
    search_fields = ('title_en',)

class SubtopicImageInline(admin.TabularInline):
    model = SubtopicImage
    extra = 1

@admin.register(BrandAdvantageSubtopic)
class BrandAdvantageSubtopicAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'layout', 'effect', 'text_position', 'order')
    inlines = [SubtopicImageInline]

@admin.register(BrandAdvantage)
class BrandAdvantageAdmin(admin.ModelAdmin):
    list_display = ('main_title_en', 'updated_at')
