from django.contrib import admin
from .models import Image
from .models import Test
from .models import InputImage
from .models import OutputImage

# Register your models here.

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'percorso', 'descrizione')

class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'time_start', 'time_end')

class InputImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'path', 'test_id')

class OutputImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'path', 'image_input_id')

admin.site.register(Image, ImageAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(InputImage, InputImageAdmin)
admin.site.register(OutputImage, OutputImageAdmin)