from django.db import models
from django.contrib.auth.models import User
import datetime

class Producto(models.Model):
    codigo = models.IntegerField(primary_key=True)
    imagen = models.ImageField(upload_to='static/')
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField()
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    stock = models.PositiveIntegerField()

    def __str__(self):
        return str(self.nombre)
    
class Carrito(models.Model):
    codigo = models.IntegerField(primary_key=True)
    propietario = models.OneToOneField(User, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Carrito de {self.propietario.username}'

class ElementoCarrito(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
    carrito = models.ForeignKey(Carrito, related_name='elementos', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.cantidad} de {self.producto.nombre}'

class Boleta(models.Model):
    id_boleta=models.AutoField(primary_key=True)
    total=models.BigIntegerField()
    fechaCompra=models.DateTimeField(blank=False, null=False, default = datetime.datetime.now)
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return str(self.id_boleta)

class detalle_boleta(models.Model):
    id_boleta = models.ForeignKey('Boleta', blank=True, on_delete=models.CASCADE)
    id_detalle_boleta = models.AutoField(primary_key=True)
    id_producto = models.ForeignKey('Producto', on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.BigIntegerField()

    def __str__(self):
        return str(self.id_detalle_boleta)

