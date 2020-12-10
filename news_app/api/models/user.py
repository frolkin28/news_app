import enum
import uuid

from django.db import models


class Role(enum.Enum):
    USER = enum.auto()
    EDITOR = enum.auto()

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class Users(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    email = models.EmailField(max_length=120)
    password = models.CharField(max_length=120)
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    role = models.IntegerField(choices=Role.choices(), default=Role.USER)
