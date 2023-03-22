from django.db import models

# Create your models here.
    
class Image(models.Model):
    percorso = models.ImageField(upload_to='imgs')
    descrizione = models.CharField(max_length=150)

    def _str_(self):
        return self.percorso