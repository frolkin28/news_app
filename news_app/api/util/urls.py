from django.templatetags.static import static


def generate_image_url(filename: str) -> str:
    return static(f'img/{filename}')
