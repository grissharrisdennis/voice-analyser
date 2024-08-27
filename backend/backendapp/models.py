from django.db import models
from django.contrib.auth.models import User

class AudioFile(models.Model):
    audio = models.FileField(upload_to='audios/')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"AudioFile {self.id}"

class Transcription(models.Model):
    audio_file = models.OneToOneField(AudioFile, on_delete=models.CASCADE, related_name='transcription')
    text = models.TextField()
    transcribed_at = models.DateTimeField(auto_now_add=True)
