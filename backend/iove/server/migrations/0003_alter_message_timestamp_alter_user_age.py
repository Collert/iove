# Generated by Django 4.1.3 on 2022-12-29 20:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_alter_message_timestamp_alter_user_bio_alcohol_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 29, 12, 39, 19, 809861)),
        ),
        migrations.AlterField(
            model_name='user',
            name='age',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
