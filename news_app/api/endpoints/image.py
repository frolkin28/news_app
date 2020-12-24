from rest_framework import views
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import response


FILE_KEY = 'image'


class ImageView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        image_file = request.get(FILE_KEY, None)
        if image_file:
            print(image_file)
            return response.Response(status=201)
        else:
            return response.Response(status=400)
