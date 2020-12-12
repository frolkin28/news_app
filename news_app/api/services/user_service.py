import typing as t

from django.core.exceptions import ValidationError

from api.models import User


def get_user_by_uuid(uuid: str) -> t.Optional[User]:
    if not uuid:
        return None
    try:
        user = User.objects.filter(uuid=uuid).first()
    except ValidationError:
        return None
    return user
