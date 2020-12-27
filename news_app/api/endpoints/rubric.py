from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import status


class RubricView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request):
        pass
