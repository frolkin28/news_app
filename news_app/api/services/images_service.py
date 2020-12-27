import re
import uuid

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import ValidationError
from werkzeug.utils import secure_filename

from api.models.photo import Photo
from api.util.urls import generate_image_url


ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
UUID_PART_LENGTH = 15
NAME_PART_LENGTH = 7


def is_extension_valid(filename: str) -> bool:
    filename = secure_filename(filename)
    name, extension = _validate_filename(filename)
    if not (name and extension):
        return False
    if extension in ALLOWED_EXTENSIONS:
        return True
    return False


def _validate_filename(filename):
    pattern = re.compile(r'(\w+)\.(\w+)')
    result = re.search(pattern, filename)
    if not result:
        return (None, None)
    name = result.group(1)
    extension = result.group(2)
    return name, extension


def upload(file):
    filename = secure_filename(file.name)
    path = (settings.STATICFILES_DIRS[0] / 'img')

    fs = FileSystemStorage(location=path)

    name, ext = _validate_filename(filename)
    unique_filename = generate_unique_name(name, ext)

    fs.save(unique_filename, file)

    path = str(path / unique_filename)
    url = generate_image_url(unique_filename)
    photo = Photo(name=filename, path=path, url=url, filename=unique_filename)
    photo.save()

    return photo


def generate_unique_name(name: str, ext: str) -> str:
    file_uuid = str(uuid.uuid4())
    if len(name) > NAME_PART_LENGTH:
        name = name[:NAME_PART_LENGTH]
    filename = '{}-{}.{}'.format(name, file_uuid[:UUID_PART_LENGTH], ext)
    return filename


def get_image_by_uuid(uuid: str) -> Photo:
    if not uuid:
        return None
    try:
        photo = Photo.objects.filter(uuid=uuid).first()
    except ValidationError:
        return None
    return photo
