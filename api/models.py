from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,User
from django.utils import timezone



# Create your models here.



class Agencija(models.Model):
    agencyname=models.CharField(max_length=100)
    email=models.EmailField(max_length=100)
    phnumber=models.CharField(max_length=30,default=None)

    REQUIRED_FIELDS = ('agencyname',)
    USERNAME_FIELD=('agencyname')

    def __str__(self):
        return self.agencyname

class Putovanje(models.Model):

    agencija=models.ForeignKey(
        Agencija,on_delete=models.PROTECT,null=True)
    datum=models.DateField(null=True)
    datum_zavrsetka=models.DateField(null=True)
    naziv=models.CharField(max_length=100)
    opis=models.CharField(max_length=200)
    tip=models.CharField(max_length=100)
    prevoz=models.CharField(max_length=100)
    maxbroj=models.IntegerField(null=True)
    cijena=models.IntegerField(null=True)

    def __str__(self):
        return self.naziv

class KorisnikovaPutovanja(models.Model):
    korisnik=models.ForeignKey(User,on_delete=models.PROTECT,null=True)
    putovanje=models.ForeignKey(Putovanje,on_delete=models.PROTECT,null=True)
    