
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    image = models.ImageField(upload_to='user_images', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    IIN = models.CharField(max_length=12, blank=True, unique=True)
