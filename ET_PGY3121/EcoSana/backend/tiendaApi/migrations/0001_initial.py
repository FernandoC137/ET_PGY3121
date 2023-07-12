# Generated by Django 4.2.2 on 2023-07-11 23:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='static/')),
                ('nombre', models.CharField(max_length=100)),
                ('precio', models.IntegerField()),
                ('descripcion', models.TextField()),
                ('categoria', models.CharField(max_length=100)),
                ('stock', models.PositiveIntegerField()),
            ],
        ),
    ]
