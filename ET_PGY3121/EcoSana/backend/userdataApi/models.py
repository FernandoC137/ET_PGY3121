from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Resto de los campos de perfil necesarios

    def __str__(self):
        return self.user.username

    @property
    def email(self):
        return self.user.email

    @property
    def is_superuser(self):
        return self.user.is_superuser

