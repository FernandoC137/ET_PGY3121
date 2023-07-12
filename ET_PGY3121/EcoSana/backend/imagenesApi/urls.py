from django.urls import path
from .views import ImagenListCreateAPIView

urlpatterns = [
    path('imagenes/', ImagenListCreateAPIView.as_view(), name='imagen-list-create'),
]
