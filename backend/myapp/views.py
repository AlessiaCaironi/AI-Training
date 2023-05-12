from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
import json
from rest_framework import viewsets
from .serializers import ItemSerializer
from .serializers import ImageSerializer
from .models import Item
from .models import Image
from .tasks import preprocessing_img
from rest_framework import generics

# authentication
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated

@permission_classes([IsAuthenticated])
class ItemView(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    # selec_related utile per fare un'unica query al posto di 2 
    # (1 per item e 1 per ampliare i record con i dati dell'utente creatore)
    queryset = Item.objects.select_related('created_by')

    # start celery
    @action(detail=True,
        methods = ["get"],
        name = "start worker",
        url_name = r'start_worker',
        url_path = r'start',)
    def start(self, request, pk=None):
        preprocessing_img.delay(pk)
        return HttpResponse("Start processing")
    
    # get username from pk
    # @action(detail=True,
    #     methods = ["get"],
    #     name = "start worker",
    #     url_name = r'get_username',
    #     url_path = r'username',)
    # def get_username(self, request, pk=None):
    #     queryset_test = Test.objects.filter(pk=pk)
    #     user_id = queryset_test.values_list('created_by', flat=True)[0]
    #     queryset_user = User.objects.filter(pk=user_id)
    #     username = queryset_user.values_list('username', flat=True)[0]
    #     return HttpResponse(username)
    

@permission_classes([IsAuthenticated])
class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()

# get all records in Image with item_id=itemid
# testid is specified in URL
@permission_classes([IsAuthenticated])
class ImageItemView(generics.ListAPIView):
    serializer_class = ImageSerializer
    def get_queryset(self):
        itemid = self.kwargs['itemid']
        return Image.objects.filter(item_id=itemid).order_by('path_input')

# authentication
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/', 
        '/api/images/',
        '/api/items/',
    ]
    return Response(routes)