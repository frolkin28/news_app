from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication

from api.services import tag_service
from api.util.serializers import TagSerializer


class TagView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request):
        tags = tag_service.get_all_tags()
        return response.Response(TagSerializer(tags, many=True).data)
