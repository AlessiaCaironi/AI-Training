from rest_framework import serializers
from .models import Test
from .models import Image

class TestSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Test
        fields = ('id', 'name', 'description', 'time_start', 'time_end')


class ImageSerializer(serializers.ModelSerializer):

    path_output = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True)

    class Meta: 
        model = Image
        fields = ('id', 'path_input', 'path_output', 'test_id')

