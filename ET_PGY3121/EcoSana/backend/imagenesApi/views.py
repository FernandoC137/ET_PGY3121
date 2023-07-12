from django.shortcuts import render

# Create your views here.

from rest_framework import generics
from .models import Imagen
from .serializers import ImagenSerializer

class ImagenListCreateAPIView(generics.ListCreateAPIView):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
