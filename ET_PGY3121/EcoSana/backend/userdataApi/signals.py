from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from userdataApi.models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

@receiver(pre_delete, sender=User)
def delete_user_profile(sender, instance, **kwargs):
    try:
        profile = instance.profile
        profile.delete()
    except Profile.DoesNotExist:
        pass