from django.urls import path, include

from api.endpoints.auth import RegisterView
from api.endpoints.auth import LoginView
from api.endpoints.auth import LogoutView
from api.endpoints.user import UserView
from api.endpoints.news import NewsView
from api.views import index


authpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]

apipatterns = [
    path('user/<uuid>/', UserView.as_view(), name='user'),
    path('news/', NewsView.as_view(), name='news'),
    path('news/<uuid>', NewsView.as_view(), name='news_by_uuid'),
]


urlpatterns = [
    path('', index, name='index'),
    path('auth/', include(authpatterns)),
    path('api/', include(apipatterns)),
]
