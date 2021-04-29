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


class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["receiving_username"]


class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ["requesting_username"]