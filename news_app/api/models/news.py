import uuid

from django.db import models

from .photo import Photo
from .rubric import Rubric
from .tag import Tag
from .user import User


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
    photo = models.OneToOneField(Photo, on_delete=models.SET(None), null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True, related_name='news')
    rubrics = models.ManyToManyField(Rubric, blank=True, related_name='news')
