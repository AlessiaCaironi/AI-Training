# Generated by Django 4.1.7 on 2023-05-02 16:57

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0004_alter_test_created_by'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Test',
            new_name='Item',
        ),
        migrations.RenameField(
            model_name='image',
            old_name='test_id',
            new_name='item_id',
        ),
    ]
