# Generated by Django 4.1.7 on 2023-03-22 15:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_alter_test_description_alter_test_name'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Image',
        ),
    ]
