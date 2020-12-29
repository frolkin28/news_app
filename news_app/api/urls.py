from django.urls import path, include

from api.endpoints.auth import RegisterView
from api.endpoints.auth import LoginView
from api.endpoints.auth import LogoutView
from api.endpoints.user import UserView
from api.endpoints.news import NewsView
from api.endpoints.image import ImageView
from api.endpoints.rubric import RubricView
from api.endpoints.tag import TagView
from api.views import index


authpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]

apipatterns = [
    path('user/<uuid>', UserView.as_view(), name='user'),
    path('news/', NewsView.as_view(), name='news_list'),
    path('news/<uuid>', NewsView.as_view(), name='news_by_uuid'),
    path('image/', ImageView.as_view(), name='image'),
    path('rubric/', RubricView.as_view(), name='rubric_list'),
    path('rubric/<uuid>', RubricView.as_view(), name='rubric_by_uuid'),
    path('tag/', TagView.as_view(), name='tag_list'),
]


urlpatterns = [
    path('index/', index, name='index'),
    path('auth/', include(authpatterns)),
    path('api/', include(apipatterns)),
]
