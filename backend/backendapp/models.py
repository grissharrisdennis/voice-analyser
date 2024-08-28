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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transcribed_at = models.DateTimeField(auto_now_add=True)
    
class WordFrequency(models.Model):
    transcription = models.ForeignKey(Transcription, on_delete=models.CASCADE, related_name='word_frequencies')
    word = models.CharField(max_length=255)
    frequency = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.word} ({self.frequency}) in Transcription {self.transcription.id}"
