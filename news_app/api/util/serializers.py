from django.contrib.auth import authenticate
from rest_framework import serializers

from api.models import News, Photo, Tag, User, Rubric
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


class RubricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rubric
        fields = ('uuid', 'title', 'description')


class NewsSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False, required=False)
    photo = PhotoSerializer(many=False, required=False, allow_null=True)
    tags = TagSerializer(many=True, required=False)
    rubrics = RubricSerializer(many=True, required=False)

    class Meta:
        model = News
        fields = (
            'uuid',
            'title',
            'content',
            'date_created',
            'author',
            'photo',
            'tags',
            'rubrics',
        )
    extra_kwargs = {
        'uuid': {'read_only': True},
    }


class UpdateNewsSerializer(serializers.ModelSerializer):
    uuid = serializers.CharField(required=True)
    photo = PhotoSerializer(many=False, required=False, allow_null=True)
    tags = TagSerializer(many=True, required=False)
    rubrics = RubricSerializer(many=True, required=False)

    class Meta:
        model = News
        fields = (
            'uuid',
            'title',
            'content',
            'photo',
            'tags',
            'rubrics',
        )


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
