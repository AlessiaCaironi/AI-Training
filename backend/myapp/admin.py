from django.contrib import admin
from .models import Data
from .models import Image

# Register your models here.

class DataAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'age', 'presenza')

class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'percorso', 'descrizione')

admin.site.register(Data, DataAdmin)
admin.site.register(Image, ImageAdmin)