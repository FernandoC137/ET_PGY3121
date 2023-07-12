from django.urls import path
from .views import (ProductoListCreateAPIView, ProductoRetrieveUpdateDestroyAPIView,
                    CarritoAPIView, ElementoCarritoListCreateAPIView,
                    ElementoCarritoRetrieveUpdateDestroyAPIView,
                    BoletaListCreateAPIView, BoletaRetrieveUpdateDestroyAPIView,
                    detalle_boletaListCreateAPIView, detalle_boletaRetrieveUpdateDestroyAPIView)

urlpatterns = [
    path('productos/', ProductoListCreateAPIView.as_view(), name='lista-productos'),
    path('productos/<int:pk>/', ProductoRetrieveUpdateDestroyAPIView.as_view(), name='detalle-producto'),
    path('carrito/<str:propietario__username>/', CarritoAPIView.as_view(), name='detalle-carrito'),
    path('elementos/', ElementoCarritoListCreateAPIView.as_view(), name='lista-elementos'),
    path('elementos/<int:pk>/', ElementoCarritoRetrieveUpdateDestroyAPIView.as_view(), name='detalle-elemento'),
    path('boletas/', BoletaListCreateAPIView.as_view(), name='lista-boletas'),
    path('boletas/<int:pk>/', BoletaRetrieveUpdateDestroyAPIView.as_view(), name='detalle-boleta'),
    path('detalle_boleta/', detalle_boletaListCreateAPIView.as_view(), name='lista-detalle_boleta'),
    path('detalle_boleta/<int:pk>/', detalle_boletaRetrieveUpdateDestroyAPIView.as_view(), name='detalle-detalle_boleta'),
]
