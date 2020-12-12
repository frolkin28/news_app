from rest_framework import generics

from api.util.serializers import UserSerializer


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'uuid'

    def get_object(self, *args, **kwargs):
        return self.request.user
