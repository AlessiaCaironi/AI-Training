from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import TestSerializer
from .serializers import ImageSerializer
from .models import Test
from .models import Image
from .tasks import resize_img
from rest_framework import generics

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

# get all records in Image with test_id=testid
# testid is specified in URL
class ImageTestView(generics.ListAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        testid = self.kwargs['testid']
        return Image.objects.filter(test_id=testid)
    
def ResizeView(request, testid):
    resize_img.delay(testid)
    return HttpResponse("Done")

