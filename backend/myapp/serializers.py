from rest_framework import serializers
from .models import Item
from .models import Image

# autenticazione
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')


class ItemSerializer(serializers.ModelSerializer):

    time_start = serializers.DateTimeField(required=False)
    time_end = serializers.DateTimeField(required=False)
    created_by = UserSerializer(required=False) 

    image_count = serializers.IntegerField(
        source='image_set.count',
        read_only=True
    )

    class Meta: 
        model = Item
        fields = ('id', 'name', 'description', 'time_start', 'time_end', 'created_by', 'image_count')




class ImageSerializer(serializers.ModelSerializer):

    path_output = serializers.ImageField(required=False, max_length=None, 
                                         allow_empty_file=True, use_url=True)
    path_input = serializers.ImageField(required=True, allow_empty_file=False)

    class Meta: 
        model = Image
        fields = ('id', 'path_input', 'path_output', 'item_id')


# create token if valid username and password are provided
# more specific, it creates 2 tokens (access and refresh)
# decoding the access token, you will get username and email
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

# used to register a new user in the db    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        
        user.set_password(validated_data['password'])
        user.save()

        return user