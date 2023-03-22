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
    
class InputImage(models.Model):
    path = models.ImageField(upload_to='images_input')
    test_id = models.ForeignKey(Test, on_delete=models.CASCADE)

    def _str_(self):
        return self.path
    
class OutputImage(models.Model):
    path = models.ImageField(upload_to='images_output')
    image_input_id = models.ForeignKey(InputImage, on_delete= models.CASCADE)

    def _str_(self):
        return self.path