from django.db import models

# Create your models here.
    
class Test(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200, default='')
    # inizio computazione
    time_start = models.DateTimeField()
    # fine computazione
    time_end = models.DateTimeField()

    def _str_(self):
        return self.name
    
class Image(models.Model):
    path_input = models.ImageField(upload_to='images_input')
    path_output = models.ImageField(upload_to='images_output')
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)

    def _str_(self):
        return self.path_input

