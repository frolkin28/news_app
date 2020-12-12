from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import status

from api.util.serializers import UserSerializer
from api.services import user_service


class UserView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request, uuid):
        user = user_service.get_user_by_uuid(uuid)
        if not user:
            return response.Response(status=status.HTTP_404_NOT_FOUND)
        return response.Response(UserSerializer(user).data)
