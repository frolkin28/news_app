from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication


class TestView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request):
        print(request.user)
        return response.Response({})
