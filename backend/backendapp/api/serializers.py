from rest_framework import serializers
# from django.contrib.auth.models import User
from ..models import AudioFile, Transcription

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ['id','audio', 'uploaded_at']
    
    

class TranscriptionSerializer(serializers.ModelSerializer):
    audio_file = AudioFileSerializer(read_only=True)

    class Meta:
        model = Transcription
        fields = ['id', 'audio_file', 'text', 'language', 'transcribed_at']

# class UserModelSerializer(serializers.ModelSerializer):
#     audio_files = AudioFileSerializer(many=True, read_only=True)

#     class Meta:
#         model = User
#         fields = ('id', 'username', 'audio_files')