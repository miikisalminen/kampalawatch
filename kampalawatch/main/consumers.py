import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class RoomConsumer(WebsocketConsumer):
    def connect(self):
        """
        Connect to a chat room
        Spaces are replaced like this: 'My new room' -> 'My_new_room'
        """
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_name = self.room_name.replace(" ", "_")
        self.room_group_name = "room_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        print("websocket disconnected")
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )


# TODO NEXT I NEED TO FIGURE OUT A WAY HOW TO BROADCAST
# WHEN A VIDEO IS PAUSED/PLAYED