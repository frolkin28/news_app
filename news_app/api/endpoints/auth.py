from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth import logout
from rest_framework import views
from rest_framework import generics
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication

from api.util.serializers import UserSerializer, LoginSerializer


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.SessionAuthentication,)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return response.Response(UserSerializer(user).data)


class LogoutView(views.APIView):
    permission_classes = tuple()
    authentication_classes = tuple()

    def post(self, request):
        logout(request)
        resp = response.Response({})
        resp.delete_cookie('csrftoken')
        return resp


class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def perform_create(self, serializer):
        user = serializer.save()
        user.backend = settings.AUTHENTICATION_BACKENDS[0]
        login(self.request, user)
