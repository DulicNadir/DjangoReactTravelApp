from rest_framework import serializers
from .models import Agencija, KorisnikovaPutovanja,Putovanje
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from django.contrib.auth.hashers import make_password





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= ['id','username','password','email','first_name','last_name']
        extra_kwargs={'password':{
            'write_only':True,
        }}

    def create(self,validated_data,password=None):
        user=User.objects.create_user(**validated_data,password = make_password(password))
        Token.objects.create(user=user)
        return user
        
class AgencijaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Agencija
        fields=['id','agencyname','email','phnumber']
        depth=1

class PutovanjeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Putovanje
        fields=['id','datum','datum_zavrsetka','tip','naziv','opis','agencija','prevoz','maxbroj','cijena']
    
class KorisnikPutovanjeSerializer(serializers.ModelSerializer):
    class Meta:
        model=KorisnikovaPutovanja
        fields=['id','putovanje']
        depth=2

class KorisnikPutovanjeSerializer1(serializers.ModelSerializer):
    class Meta:
        model=KorisnikovaPutovanja
        fields=['id','korisnik','putovanje']
