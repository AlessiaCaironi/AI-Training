from django.db import models

# Create your models here.
class Data(models.Model):
    name = models.CharField(max_length=80)
    age = models.IntegerField()
    presenza = models.BooleanField(default=True)

    def _str_(self):
        return self.name
    
class Image(models.Model):
    percorso = models.ImageField(upload_to='imgs')
    descrizione = models.CharField(max_length=150)

    def _str_(self):
        return self.percorso