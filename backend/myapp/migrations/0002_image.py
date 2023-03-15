# Generated by Django 4.1.7 on 2023-03-13 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('percorso', models.ImageField(upload_to='imgs')),
                ('descrizione', models.CharField(max_length=150)),
            ],
        ),
    ]