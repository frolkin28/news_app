import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin

from api.util.enums import Role
from api.util.custom_manager import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=120)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    role = models.IntegerField(choices=Role.choices(), default=Role.USER.value)

    # additional fileds for Django
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
