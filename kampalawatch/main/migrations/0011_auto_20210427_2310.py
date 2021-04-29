# Generated by Django 3.2 on 2021-04-27 20:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0010_friendrequest_requesting_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receiving_username', models.CharField(max_length=50, null=True)),
                ('requesting_username', models.CharField(max_length=50, null=True)),
                ('notif_type', models.CharField(choices=[('LKE', 'Like'), ('COM', 'Comment'), ('INV', 'Invite'), ('REQ', 'Friendrequest')], default='INV', max_length=3)),
                ('receiving_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='receiving_user', to=settings.AUTH_USER_MODEL)),
                ('requesting_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requesting_user', to=settings.AUTH_USER_MODEL)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.room')),
            ],
        ),
        migrations.DeleteModel(
            name='FriendRequest',
        ),
    ]