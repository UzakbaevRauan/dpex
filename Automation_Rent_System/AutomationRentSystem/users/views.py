# /////
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from .models import User

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()  
    serializer_class = UserSerializer  
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(): 
            user = serializer.save() 
            if user:
                token = Token.objects.create(user=user)
                response_data = {
                    'token': token.key,  
                    'user': serializer.data 
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(generics.CreateAPIView):
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user) 
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:  
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
