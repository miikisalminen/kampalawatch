from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
    # API Endpoint for creating Users
    path("api/auth", UserView.as_view()),
    # API Endpoint for generating access- and refresh tokens
    path(
        "api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    # API Endpoint for generating refresh tokens
    path(
        "api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"
    ),
    # API Endpoint(s) for fetching Rooms
    path("api/rooms", RoomListCreate.as_view()),
    path("api/get_friendrooms", GetFriendRooms.as_view()),
    path("api/update_room", RoomUpdate.as_view()),
    # API Endpoint(s) for managing Friendrequests
    path("api/create_friendrequest", FriendRequestCreate.as_view()),
    path("api/get_notifications", NotificationGet.as_view()),
    # API Endpoint for managing Friendships
    path("api/create_friendship", FriendshipCreate.as_view()),
    # React template
    path("", TemplateView.as_view(template_name="build/index.html")),
]
