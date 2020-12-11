from django.contrib import admin
from .models import User, News, Photo, Rubric, Tag

# Register your models here.
admin.site.register(User)
admin.site.register(Photo)
admin.site.register(Rubric)
admin.site.register(Tag)
admin.site.register(News)
