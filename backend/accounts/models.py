from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from random import randint


class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class PreSaveUser(models.Model):
    email = models.EmailField()
    username = models.CharField(max_length=55)
    password = models.CharField(max_length=125)
    created = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __str__(self):
        return self.email


class Otp(models.Model):
    email = models.EmailField(unique=True)
    code = models.PositiveIntegerField(
        validators=[MaxValueValidator(limit_value=99999),
                    MinValueValidator(limit_value=10000)]
    )
    created = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def generate_random_code():
        return randint(10000, 99999)

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='avatar/', blank=True, null=True)
    bio = models.CharField(max_length=225, blank=True, null=True)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
