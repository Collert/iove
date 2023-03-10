# Generated by Django 4.1.3 on 2022-12-31 07:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_alter_message_timestamp_alter_user_age'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ethnicity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 30, 23, 4, 31, 632779)),
        ),
        migrations.RemoveField(
            model_name='user',
            name='bio_ethnicity',
        ),
        migrations.RemoveField(
            model_name='user',
            name='bio_languages',
        ),
        migrations.AddField(
            model_name='user',
            name='bio_ethnicity',
            field=models.ManyToManyField(blank=True, related_name='representatives', to='server.ethnicity'),
        ),
        migrations.AddField(
            model_name='user',
            name='bio_languages',
            field=models.ManyToManyField(blank=True, related_name='speakers', to='server.language'),
        ),
    ]
