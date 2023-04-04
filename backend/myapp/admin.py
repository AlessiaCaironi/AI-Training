from django.contrib import admin
from .models import Test
from .models import Image

# Register your models here.

class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'time_start', 'time_end', 'created_by')

class ImageAdmin(admin.ModelAdmin):
    List_display = ('id', 'path_input', 'path_output' 'test_id')

admin.site.register(Test, TestAdmin)
admin.site.register(Image, ImageAdmin)
