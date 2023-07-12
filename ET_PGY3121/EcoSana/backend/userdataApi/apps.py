from django.apps import AppConfig


class UserdataapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'userdataApi'

    def ready(self):
        import userdataApi.signals 
