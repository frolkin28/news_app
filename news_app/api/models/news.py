import uuid

from django.db import models


class News(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True)
    date_created = models.DateTimeField(
        auto_now_add=True,
        blank=False,
        null=False,
    )
