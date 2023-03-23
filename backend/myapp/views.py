from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TestSerializer
from .serializers import ImageSerializer
from .models import Test
from .models import Image
from rest_framework import generics

# Create your views here.

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

# prendi tutte le immagini input relative ad un test
class ImageTestView(generics.ListAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        testid = self.kwargs['testid']
        return Image.objects.filter(test_id=testid)
    


