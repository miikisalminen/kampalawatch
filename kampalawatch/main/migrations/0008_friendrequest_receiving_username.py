# Generated by Django 3.2 on 2021-04-26 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_friendrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='friendrequest',
            name='receiving_username',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
