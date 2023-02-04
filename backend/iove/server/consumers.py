import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from channels.consumer import AsyncConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):

        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)( #type: ignore
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)( #type: ignore
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        try:
            text_data_json = json.loads(text_data)
            print(f"text_data_json: {text_data_json}")
            message = text_data_json["message"]
            sender = text_data_json["from"]
        except:
            message = text_data
            sender = None
        print(f"message: {message}")

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)( #type: ignore
            self.room_group_name, {"type": "chat_message", "message": message, "sender":sender}
        )

    # Receive message from room group
    def chat_message(self, event):
        print(f"chat_message: {event}")
        message = event["message"]
        sender = event["sender"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message, "sender":sender})) 