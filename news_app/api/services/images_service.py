import re


ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']


def is_filename_valid(filename: str) -> bool:
    pattern = re.compile(r'(\w+)\.(\w+)')
    result = re.search(pattern, filename)
    if not result:
        return False
    extension = result.group(2)
    if extension in ALLOWED_EXTENSIONS:
        return True
    return False
