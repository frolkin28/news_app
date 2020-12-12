from django.contrib.auth import authenticate
from rest_framework import serializers

from api.models import News, Photo, Tag, User
from api.util.validators import validate_email


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
        exclude = ('is_staff', 'is_active')
        extra_kwargs = {
            'password': {'required': True, 'write_only': True},
            'email': {'required': True}
        }

    @staticmethod
    def validate_email(value):
        return validate_email(value)

    def create(self, validated_data):
        return User.objects.create_user(
            validated_data.pop('email'),
            validated_data.pop('password'),
            **validated_data
        )


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


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(
            username=attrs['email'],
            password=attrs['password'],
        )

        if not user:
            raise serializers.ValidationError('Incorrect email or password.')

        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')

        return {'user': user}
