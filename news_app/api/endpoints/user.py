from rest_framework import generics
from rest_framework import permissions
from rest_framework import authentication

from api.util.serializers import UserSerializer


class UserView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.SessionAuthentication,)

    serializer_class = UserSerializer
    lookup_field = 'uuid'

    def get_object(self, *args, **kwargs):
        return self.request.user
