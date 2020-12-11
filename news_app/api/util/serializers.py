from rest_framework import serializers

from models import News, Photo, User, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'uuid',
            'email',
            'password',
            'first_name',
            'last_name',
            'role',
        )
        write_only_fields = ('password',)


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('uuid', 'name', 'path')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('uuid', 'title')


class NewsSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    photo = PhotoSerializer(many=False)
    tags = TagSerializer(many=True)

    class Meta:
        model = News
        fields = ('uuid', 'title', 'content', 'date_created')
