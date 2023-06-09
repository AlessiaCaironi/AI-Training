from django.db import models
from django_userforeignkey.models.fields import UserForeignKey
    
class Item(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, default='')
    # inizio computazione
    time_start = models.DateTimeField(null=True)
    # fine computazione
    time_end = models.DateTimeField(null=True)
    created_by = UserForeignKey(auto_user_add=True)

    def __str__(self):
        return self.name
    
class Image(models.Model):
    path_input = models.ImageField(upload_to='images_input')
    path_output = models.ImageField(upload_to='images_output')
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk) + ", " + self.path_input.name
    
