<<<<<<< HEAD
from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import AudioFile, Transcription

class AudioFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioFile
        fields = ['id', 'audio', 'uploaded_at','user_id']
        


class TranscriptionSerializer(serializers.ModelSerializer):
    audio_file = AudioFileSerializer(read_only=True)

    class Meta:
        model = Transcription
        fields = ['id', 'audio_file', 'text', 'transcribed_at']


class AudioFileDetailSerializer(serializers.ModelSerializer):
    transcription = TranscriptionSerializer(read_only=True)

    class Meta:
        model = AudioFile
        fields = ['id', 'audio', 'user', 'uploaded_at', 'transcription']


class UserModelSerializer(serializers.ModelSerializer):
    audio_files = AudioFileSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'audio_files')
        extra_kwargs = {
            'password': {'write_only': True}  # Ensure password is not included in responses
        }
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

            
=======
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
>>>>>>> a09a68ea8dfed890562f7050b1354fefe75e7213
