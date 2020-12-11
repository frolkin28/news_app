import uuid

from django.contrib.auth.hashers import check_password, make_password
from django.db import models

from api.util.enums import Role


class User(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    email = models.EmailField(max_length=120, unique=True)
    password = models.CharField(max_length=120)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    role = models.IntegerField(choices=Role.choices(), default=Role.USER)

    @staticmethod
    def generate_password_hash(password):
        return make_password(password)

    def check_password(self, password):
        return check_password(password, self.password)
