from rest_framework import serializers
from .models import Image


class ImageSerializer(serializers.ModelSerializer):
    percorso = serializers.ImageField(required=False, max_length=None, 
                                     allow_empty_file=True, use_url=True)

    class Meta: 
        model = Image
        fields = ('id', 'percorso', 'descrizione')