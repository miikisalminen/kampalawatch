import json

from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *

from rest_framework import generics
from rest_framework.authtoken.models import Token

# Create your views here.


class UserView(APIView):

    serializer_class = UserSerializer

    def get(self, request):

        return Response(request.user.username)

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            # Creating the user instance
            user = User.objects.create_user(
                serializer.data["username"],
                serializer.data["email"],
                serializer.data["password"],
            )
            user.save()

            # Create friendship instance for the new user
            friendship_instance = Friendship.objects.create(this_user=request.user)
            friendship_instance.save()

            return Response(serializer.data)


class RoomListCreate(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    # Returns the Rooms the user is the creator of
    def get(self, request):
        query = Room.objects.filter(creator=request.user.id).values(
            "name", "creator", "current_video"
        )
        return Response(json.dumps(list(query)))

    # Creating a new Room
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_room = Room.objects.create(
                name=serializer.data["name"], creator=request.user
            )
            new_room.save()

            return Response(serializer.data)


class GetFriendRooms(APIView):
    def get(self, request):
        data = []
        query = Room.objects.filter(participants=request.user.id)
        for i in query:
            data.append({"name": i.name, "id": i.id, "creator": i.creator.username})
        return Response(json.dumps(data))


class RoomUpdate(APIView):
    serializer_class = UpdateRoomSerializer

    def post(self, request):
        serializer = UpdateRoomSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            this_room = Room.objects.get(name=serializer.data["name"])
            this_room.current_video = serializer.data["current_video"]
            this_room.current_time = serializer.data["current_time"]

            this_room.save()

            return Response(serializer.data)


class FriendRequestCreate(APIView):
    serializer_class = FriendRequestSerializer

    # Get all users except the one who made the request and his friends
    def get(self, request):

        query = User.objects.exclude(username=request.user.username).values("username")
        return Response(json.dumps(list(query)))

    # Create a friendrequest
    def post(self, request):
        serializer = FriendRequestSerializer(data=request.data)
        if (
            serializer.is_valid(raise_exception=True)
            and not Notification.objects.filter(
                requesting_user=request.user,
                receiving_user=User.objects.get(
                    username=serializer.data["receiving_username"]
                ),
            ).exists()
        ):
            new_request = Notification.objects.create(
                receiving_user=User.objects.get(
                    username=serializer.data["receiving_username"]
                ),
                requesting_user=request.user,
            )
            new_request.save()

            return Response(serializer.data)


class NotificationGet(APIView):
    # Get the users receieved Notifications
    def get(self, request):
        data = []
        query = Notification.objects.filter(receiving_user=request.user)
        for i in query:
            data.append(
                {
                    "requesting_user": i.requesting_user.username,
                    "type_of": i.notif_type,
                    "room": i.room.name,
                }
            )

        return Response(json.dumps(data))


class FriendshipCreate(APIView):

    serializer_class = FriendshipSerializer

    def post(self, request):
        print(request.data)
        serializer = FriendshipSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):

            # If the notification is a friendrequest
            if serializer.data["notif_type"] == "Friendrequest":
                # Add to receivers friends
                this_friendship = Friendship.objects.get(this_user=request.user)
                this_friendship.friends.add(
                    User.objects.get(username=serializer.data["requesting_username"])
                )
                this_friendship.save()

                # Add to requesters friends
                other_friendship = Friendship.objects.get(
                    this_user=User.objects.get(
                        username=serializer.data["requesting_username"]
                    )
                )
                other_friendship.friends.add(request.user)
                other_friendship.save()

                # Delete friendrequest
                friend_req = Notification.objects.get(
                    requesting_user=User.objects.get(
                        username=serializer.data["requesting_username"]
                    ),
                    receiving_user=request.user,
                )
                friend_req.delete()

            # If the notification is an invite
            elif serializer.data["notif_type"] == "Invite":
                # Add user to room
                this_room = Room.objects.get(name=serializer.data["room_name"])

                this_room.participants.add(request.user)
                this_room.save()

                # Delete invite
                invite = Notification.objects.get(
                    notif_type="Invite",
                    requesting_username=serializer.data["requesting_username"],
                    receiving_user=request.user,
                    room_name=serializer.data["room_name"],
                )

                invite.delete()

        return Response(serializer.data)
