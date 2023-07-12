from django.urls import path
from .views import ProfileDetailAPIView

urlpatterns = [
    path('profile/', ProfileDetailAPIView.as_view(), name='profile-detail'),
]
