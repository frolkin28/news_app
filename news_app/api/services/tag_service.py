import typing as t

from api.models.tag import Tag


def get_all_tags() -> Tag:
    return Tag.objects.all()


def get_tags_by_ids(ids: t.List[str]) -> t.List[Tag]:
    return Tag.objects.filter(uuid__in=ids).all() if ids else []
