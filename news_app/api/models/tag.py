import uuid

from django.db import models


class Tag(models.Model):
    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    title = models.CharField(max_length=60, null=False, blank=False)
