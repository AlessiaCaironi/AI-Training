from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DataSerializer
from .serializers import ImageSerializer
from .models import Data
from .models import Image

# Create your views here.
class DataView(viewsets.ModelViewSet):
    serializer_class = DataSerializer
    queryset = Data.objects.all()


class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

