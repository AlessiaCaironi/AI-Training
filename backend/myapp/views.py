from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TestSerializer
from .serializers import InputImageSerializer
from .serializers import OutputImageSerializer
from .models import Test
from .models import InputImage
from .models import OutputImage

# Create your views here.

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

class InputImageView(viewsets.ModelViewSet):
    serializer_class = InputImageSerializer
    queryset = InputImage.objects.all()

class OutputImageView(viewsets.ModelViewSet):
    serializer_class = OutputImageSerializer
    queryset = OutputImage.objects.all()