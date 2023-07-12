from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.CharField(source='user.email')
    is_superuser = serializers.BooleanField(source='user.is_superuser')

    class Meta:
        model = Profile
        fields = ['username', 'email', 'is_superuser']  # Incluye los campos 'username', 'email' y 'is_superuser'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Puedes agregar campos adicionales si los necesitas
        return representation
