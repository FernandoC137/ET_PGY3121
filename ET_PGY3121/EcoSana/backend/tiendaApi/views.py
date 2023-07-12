from rest_framework import generics
from django.contrib.auth.models import User
from .models import Producto, Carrito, ElementoCarrito, Boleta, detalle_boleta
from .serializers import ProductoSerializer, ElementoCarritoSerializer, CarritoSerializer, BoletaSerializer, detalle_boletaSerializer

class ProductoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CarritoAPIView(generics.RetrieveAPIView):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer
    lookup_field = 'propietario__username'
    
    def emitir_boleta(self, carrito):
        total = 0
        elementos = carrito.elementos.all()
        for elemento in elementos:
            subtotal = elemento.producto.precio * elemento.cantidad
            total += subtotal
            detalle_boleta.objects.create(
                id_boleta=boleta,
                id_producto=elemento.producto,
                cantidad=elemento.cantidad,
                subtotal=subtotal
            )

        boleta = Boleta.objects.create(total=total)
        return boleta

    def post(self, request, *args, **kwargs):
        carrito = self.get_object()
        boleta = self.emitir_boleta(carrito)
        serializer = BoletaSerializer(boleta)
        return response(serializer.data, status=status.HTTP_201_CREATED)

class ElementoCarritoListCreateAPIView(generics.ListCreateAPIView):
    queryset = ElementoCarrito.objects.all()
    serializer_class = ElementoCarritoSerializer

class ElementoCarritoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ElementoCarrito.objects.all()
    serializer_class = ElementoCarritoSerializer

class BoletaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Boleta.objects.all()
    serializer_class = BoletaSerializer

class BoletaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Boleta.objects.all()
    serializer_class = BoletaSerializer

class detalle_boletaListCreateAPIView(generics.ListCreateAPIView):
    queryset = detalle_boleta.objects.all()
    serializer_class = detalle_boletaSerializer

class detalle_boletaRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = detalle_boleta.objects.all()
    serializer_class = detalle_boletaSerializer