import re

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from werkzeug.utils import secure_filename

from api.models.photo import Photo


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

    photo = Photo(name=filename)
    photo.save()

    uuid = str(photo.uuid)
    name, ext = _validate_filename(filename)
    unique_filename = generate_unique_name(name, ext, uuid)

    fs.save(unique_filename, file)

    photo.path = str(path / unique_filename)
    photo.save()


def generate_unique_name(name: str, ext: str, uuid: str):
    if len(name) > NAME_PART_LENGTH:
        name = name[:NAME_PART_LENGTH]
    filename = '{}-{}.{}'.format(name, uuid[:UUID_PART_LENGTH], ext)
    return filename
