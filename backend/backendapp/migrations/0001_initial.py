# Generated by Django 5.0.6 on 2024-08-21 19:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AudioFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('audio', models.FileField(upload_to='audios/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transcription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('language', models.CharField(default='English', max_length=50)),
                ('transcribed_at', models.DateTimeField(auto_now_add=True)),
                ('audio_file', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='transcription', to='backendapp.audiofile')),
            ],
        ),
    ]
