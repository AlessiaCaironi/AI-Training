# Generated by Django 4.1.7 on 2023-03-22 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_rename_inputimages_inputimage_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='description',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='test',
            name='name',
            field=models.CharField(max_length=50),
        ),
    ]
