from django.contrib import admin
from .models import Producto, Carrito, ElementoCarrito, Boleta, detalle_boleta


# Register your models here.
admin.site.register(Producto)
admin.site.register(Carrito)
admin.site.register(ElementoCarrito)
admin.site.register(Boleta)
admin.site.register(detalle_boleta)
