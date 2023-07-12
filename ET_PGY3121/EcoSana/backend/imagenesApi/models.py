from django.db import models

# Create your models here.

class Imagen(models.Model):
    imagen = models.ImageField(upload_to='static/')
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
