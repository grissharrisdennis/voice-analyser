from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.core.files.base import ContentFile
from ..models import AudioFile, Transcription
from .serializers import AudioFileSerializer, TranscriptionSerializer
import tempfile
from pydub import AudioSegment
import whisper
from audio2numpy import open_audio

model=whisper.load_model('tiny')

def transcribe_audio(audio_file):
    # Convert the Django InMemoryUploadedFile or file-like object to bytes
    audio_data = audio_file.read()

    # Write the bytes to a temporary file if needed, or use in-memory processing
    with open("temp_audio.mp3", "wb") as f:
        f.write(audio_data)
    
    # Use audio2numpy to load the audio file
    signal, sampling_rate = open_audio("temp_audio.mp3")

    # Process signal with your model
    transcription_response = model.transcribe(signal)

    return transcription_response

class AudioFileViewSet(viewsets.ModelViewSet):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            audio_file = serializer.save()
            transcription_text = transcribe_audio(audio_file.audio)
            transcription = Transcription(audio_file=audio_file, text=transcription_text)
            transcription.save()
            transcription_serializer = TranscriptionSerializer(transcription)
            return Response(transcription_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TranscriptionViewSet(viewsets.ModelViewSet):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer