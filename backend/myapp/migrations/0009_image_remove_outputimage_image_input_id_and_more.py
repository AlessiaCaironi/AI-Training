# Generated by Django 4.1.7 on 2023-03-23 12:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_alter_outputimage_image_input_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path_input', models.ImageField(upload_to='images_input')),
                ('path_output', models.ImageField(upload_to='images_output')),
                ('test_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.test')),
            ],
        ),
        migrations.RemoveField(
            model_name='outputimage',
            name='image_input_id',
        ),
        migrations.DeleteModel(
            name='InputImage',
        ),
        migrations.DeleteModel(
            name='OutputImage',
        ),
    ]