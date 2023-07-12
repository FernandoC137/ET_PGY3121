# Generated by Django 4.2.2 on 2023-07-12 04:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tiendaApi', '0006_alter_producto_propietario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carrito',
            fields=[
                ('codigo', models.IntegerField(primary_key=True, serialize=False)),
                ('creado_en', models.DateTimeField(auto_now_add=True)),
                ('propietario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ElementoCarrito',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField(default=1)),
                ('carrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='elementos', to='tiendaApi.carrito')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tiendaApi.producto')),
            ],
        ),
    ]