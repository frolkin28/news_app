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
