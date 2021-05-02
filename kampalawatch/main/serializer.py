from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["name", "delete"]


class UpdateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["current_video", "current_time", "name"]


class UpdateRoomTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["current_time", "name"]


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["receiving_username"]


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["requesting_username", "notif_type", "room_name"]
