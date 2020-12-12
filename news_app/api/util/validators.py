from django.core.exceptions import ValidationError

from api.models import User


def validate_email(email):
    if User.objects.filter(email=email).exists():
        ValidationError('User with this email already exists')
    return email
