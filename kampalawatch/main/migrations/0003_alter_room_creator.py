# Generated by Django 3.2 on 2021-04-26 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_room'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='creator',
            field=models.CharField(max_length=30),
        ),
    ]
