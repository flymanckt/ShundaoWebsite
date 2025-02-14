from django.contrib import admin
from .models import HomepageCarousel, HomeContent, BrandAdvantage, BrandAdvantageSubtopic, SubtopicImage

@admin.register(HomepageCarousel)
class HomepageCarouselAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)

@admin.register(HomeContent)
class HomeContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'content')

class SubtopicImageInline(admin.TabularInline):
    model = SubtopicImage
    extra = 1

@admin.register(BrandAdvantageSubtopic)
class BrandAdvantageSubtopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'layout', 'effect', 'text_position', 'order')
    inlines = [SubtopicImageInline]

@admin.register(BrandAdvantage)
class BrandAdvantageAdmin(admin.ModelAdmin):
    list_display = ('main_title', 'updated_at')
    # 可以在此内联 BrandAdvantageSubtopic，但也可以单独管理
