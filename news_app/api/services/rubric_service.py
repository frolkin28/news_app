import typing as t

from api.models.rubric import Rubric


def get_all_rubrics() -> Rubric:
    return Rubric.objects.all()


def get_rubrics_by_ids(ids: t.List[str]) -> t.List[Rubric]:
    return Rubric.objects.filter(uuid__in=ids).all() if ids else []


def get_rubric_by_uuid(uuid: str) -> t.Optional[Rubric]:
    if not uuid:
        return None
    return Rubric.objects.filter(uuid=uuid).first()
