from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication

from api.services import rubric_service
from api.util.serializers import RubricSerializer


class RubricView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request):
        rubrics = rubric_service.get_all_rubrics()
        return response.Response(RubricSerializer(rubrics, many=True).data)
