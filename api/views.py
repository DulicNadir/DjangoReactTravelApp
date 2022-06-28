from asyncio import mixins
from cgitb import lookup
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view,APIView
from django.views.decorators.csrf import csrf_exempt

from .models import Agencija, KorisnikovaPutovanja, Putovanje
from .serializers import  KorisnikPutovanjeSerializer, KorisnikPutovanjeSerializer1, PutovanjeSerializer,UserSerializer,AgencijaSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
User = get_user_model()



class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class AgencijaViewSet(viewsets.ModelViewSet):
    queryset=Agencija.objects.all()
    serializer_class=AgencijaSerializer

class PutovanjeViewSet(viewsets.ModelViewSet):
    queryset=Putovanje.objects.all()
    serializer_class=PutovanjeSerializer

class KorisnikPutovanjeViewSet(viewsets.ModelViewSet):
    queryset=KorisnikovaPutovanja.objects.all()
    serializer_class=KorisnikPutovanjeSerializer1

class UserTripList(generics.ListCreateAPIView):
    serializer_class=KorisnikPutovanjeSerializer

    def get_queryset(self):
        user_id=self.kwargs['user_id']
        user=User.objects.get(id=user_id)
        return KorisnikovaPutovanja.objects.filter(korisnik=user)
    @csrf_exempt
    def create(self, request, *args, **kwargs):
        # maybe replace request.method with 'GET'
        self.list(request, *args, **kwargs)
    



