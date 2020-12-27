from rest_framework import views
from rest_framework import response
from rest_framework import permissions
from rest_framework import authentication
from rest_framework import status

from api.util.serializers import NewsSerializer, UpdateNewsSerializer
from api.services import news_service, images_service


class NewsView(views.APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    authentication_classes = (authentication.SessionAuthentication,)

    def get(self, request, uuid=None):
        if uuid:
            news = news_service.get_news_by_uuid(uuid)
            if not news:
                return response.Response(status=status.HTTP_404_NOT_FOUND)
            content = NewsSerializer(news).data
        else:
            news = news_service.get_list_with_pagination()
            content = NewsSerializer(news, many=True).data

        return response.Response(content)

    def post(self, request):
        news_serializer = NewsSerializer(data=request.data)
        news_serializer.is_valid(raise_exception=True)
        news_data = news_serializer.validated_data
        photo_uuid = news_data['photo']['uuid']
        photo = images_service.get_image_by_uuid(photo_uuid)
        news = news_service.create_news(
            title=news_data['title'],
            content=news_data['content'],
            author=request.user,
            photo=photo
        )

        return response.Response(
            NewsSerializer(news).data,
            status=status.HTTP_201_CREATED,
        )

    def put(self, request):
        news_serializer = UpdateNewsSerializer(data=request.data)
        news_serializer.is_valid(raise_exception=True)
        news_data = news_serializer.validated_data
        result = news_service.update_news(news_data, request.user)
        if not result:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        return response.Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request, uuid):
        result = news_service.delete_news(uuid)
        if not result:
            return response.Response(status=status.HTTP_404_NOT_FOUND)

        return response.Response(status=status.HTTP_204_NO_CONTENT)
