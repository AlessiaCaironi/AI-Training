from django.contrib import admin
from .models import Item, Image

class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'time_start', 'time_end', 'created_by')

class ImageAdmin(admin.ModelAdmin):
    List_display = ('id', 'path_input', 'path_output' 'item_id')

admin.site.register(Item, ItemAdmin)
admin.site.register(Image, ImageAdmin)
