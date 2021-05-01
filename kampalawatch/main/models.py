from django.db import models

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

AUTH_USER_MODEL = getattr(settings, "AUTH_USER_MODEL", "auth.User")

# Create your models here.


class Room(models.Model):
    name = models.CharField(max_length=30, null=False)
    creator = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, related_name="creator"
    )
    participants = models.ManyToManyField(
        AUTH_USER_MODEL, blank=True, related_name="participants"
    )

    # Youtube video ID
    current_video = models.CharField(max_length=11, default="")
    current_time = models.IntegerField(null=False, default=0)

    def __str__(self):
        return str(self.name + " created by " + self.creator.username)


class Friendship(models.Model):
    friends = models.ManyToManyField(AUTH_USER_MODEL, blank=True)
    this_user = models.ForeignKey(
        AUTH_USER_MODEL, related_name="this_user", null=True, on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.this_user.username)


class Notification(models.Model):
    requesting_user = models.ForeignKey(
        AUTH_USER_MODEL,
        related_name="requesting_user",
        null=True,
        on_delete=models.CASCADE,
    )
    receiving_user = models.ForeignKey(
        AUTH_USER_MODEL,
        related_name="receiving_user",
        null=True,
        on_delete=models.CASCADE,
    )
    receiving_username = models.CharField(max_length=50, null=True)
    requesting_username = models.CharField(max_length=50, null=True)

    notif_type = models.CharField(
        max_length=13,
        choices=(
            ("Like", "Like"),
            ("Comment", "Comment"),
            ("Invite", "Invite"),
            ("Friendrequest", "Friendrequest"),
        ),
        default="INV",
    )

    room = models.ForeignKey(Room, on_delete=models.CASCADE, blank=True, null=True)
    room_name = models.CharField(max_length=30, blank=True, default="Anonymous room")

    def __str__(self):
        return str(
            self.requesting_user.username
            + "'s "
            + self.notif_type
            + " to"
            + self.receiving_user.username
        )


#  is_playing = models.BooleanField(default=False)
