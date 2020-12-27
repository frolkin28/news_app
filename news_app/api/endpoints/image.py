from rest_framework import views
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import response

from api.services import images_service
from api.util.serializers import PhotoSerializer

FILE_KEY = 'image'


class ImageView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        file = request.FILES.get('file', None)
        if not file:
            return response.Response({}, status=400)
        is_extension_valid = images_service.is_extension_valid(file.name)
        if not is_extension_valid:
            return response.Response(
                {'message': 'Invalid extension'},
                status=400,
            )
        image = images_service.upload(file)
        return response.Response(PhotoSerializer(image).data, status=201)
