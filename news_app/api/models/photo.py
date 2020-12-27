import uuid

from django.db import models


class Photo(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(max_length=120)
    path = models.CharField(max_length=255)
    url = models.CharField(max_length=120, null=True)
    filename = models.CharField(max_length=60, null=True)
