from django.contrib import admin
from .models import HomepageCarousel, HomeContent, HomeContentSubtopic, SubtopicImage

@admin.register(HomepageCarousel)
class HomepageCarouselAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')

class SubtopicImageInline(admin.TabularInline):
    model = SubtopicImage
    extra = 1

class HomeContentSubtopicInline(admin.TabularInline):
    model = HomeContentSubtopic
    extra = 1
    inlines = [SubtopicImageInline]

@admin.register(HomeContent)
class HomeContentAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'font', 'font_size', 'alignment')
    search_fields = ('title_en',)
    inlines = [HomeContentSubtopicInline]

@admin.register(HomeContentSubtopic)
class HomeContentSubtopicAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'layout', 'effect', 'text_position', 'order')
    inlines = [SubtopicImageInline]
