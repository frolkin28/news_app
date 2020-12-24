import datetime
import typing as t

from django.core.exceptions import ValidationError

from api.models import News, Photo, User


def create_news(
    title: str,
    content: str,
    author: User,
    date_created: datetime.datetime = None,
    photo: t.Optional[Photo] = None,
) -> News:
    news = News.objects.create(
        title=title,
        content=content,
        date_created=date_created,
        author=author,
    )
    return news


def get_news_by_uuid(uuid: str) -> t.Optional[News]:
    if not uuid:
        return None
    try:
        news = News.objects.filter(uuid=uuid).first()
    except ValidationError:
        return None
    return news


def update_news(data: dict, user: User) -> int:
    photo = data.pop('photo', None)
    tags = data.pop('tags', [])
    rubrics = data.pop('rubrics', [])
    uuid = data.pop('uuid', None)

    result = News.objects.filter(uuid=uuid, author_id=user.uuid).update(**data)
    if not result:
        return result

    news_entity = News.objects.filter(uuid=uuid, author_id=user.uuid).first()
    if not news_entity:
        return 0

    # updating relationships
    news_entity.photo = photo
    news_entity.tags.set(tags)
    news_entity.rubrics.set(rubrics)
    news_entity.save()

    return result


def delete_news(uuid: str, user: User) -> int:
    if not uuid:
        return 0
    res = News.objects.filter(uuid=uuid, author_id=user.uuid).delete()
    deleted_objects_count = res[0]
    return deleted_objects_count
