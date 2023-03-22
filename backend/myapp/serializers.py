from rest_framework import serializers
from .models import Image
from .models import Test
from .models import InputImage
from .models import OutputImage


class ImageSerializer(serializers.ModelSerializer):
    percorso = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True)
    class Meta: 
        model = Image
        fields = ('id', 'percorso', 'descrizione')

class TestSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Test
        fields = ('id', 'name', 'description', 'time_start', 'time_end')

class InputImageSerializer(serializers.ModelSerializer):
    class Meta: 
        model = InputImage
        fields = ('id', 'path', 'test_id')

class OutputImageSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OutputImage
        fields = ('id', 'path', 'image_input_id')