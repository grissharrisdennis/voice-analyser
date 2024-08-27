<<<<<<< HEAD
from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..models import AudioFile, Transcription
from .serializers import AudioFileSerializer, TranscriptionSerializer, AudioFileDetailSerializer,UserModelSerializer
from pydub import AudioSegment
from django.contrib.auth.models import User
import speech_recognition as sr
import tempfile
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect,csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
import os
from django.contrib.auth.hashers import make_password

# CreateUserView uses UserModelSerializer for handling user creation
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer  # Corrected to use the serializer
    permission_classes = [AllowAny]

# Function to handle audio transcription
def transcribe_audio(audio_file):
    recognizer = sr.Recognizer()

    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
        temp_filename = temp_file.name

        # Convert audio to WAV format using pydub
        try:
            audio = AudioSegment.from_file(audio_file, format='mp3')  # Adjust format if necessary
            audio.export(temp_filename, format='wav')  # Convert to WAV format
        except Exception as e:
            return f"Error converting audio file: {e}"

    try:
        # Load the audio file with speech_recognition
        with sr.AudioFile(temp_filename) as source:
            audio = recognizer.record(source)
            # Perform transcription
            transcription = recognizer.recognize_google(audio)
            return transcription
    except sr.UnknownValueError:
        return "Google Speech Recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Could not request results from Google Speech Recognition service; {e}"
    finally:
        # Clean up the temporary file
        os.remove(temp_filename)

# ViewSet to handle audio files
class AudioFileViewSet(viewsets.ModelViewSet):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            audio_file = serializer.save(user=request.user)  # Save audio with the user
            transcription_text = transcribe_audio(audio_file.audio)
            transcription = Transcription.objects.create(
                audio_file=audio_file, 
                text=transcription_text, # Associate transcription with the user
            )
            transcription_serializer = TranscriptionSerializer(transcription)
            return Response(transcription_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AudioFileDetailView(generics.RetrieveAPIView):
    queryset = AudioFile.objects.all()
    serializer_class = AudioFileDetailSerializer
    permission_classes = [IsAuthenticated]


class UserAudioFilesView(generics.ListAPIView):
    serializer_class = AudioFileDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return AudioFile.objects.filter(user_id=user_id)

# ViewSet to handle transcriptions
class TranscriptionViewSet(viewsets.ModelViewSet):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer
    
    

class TranscriptionDetailView(generics.RetrieveAPIView):
    queryset = Transcription.objects.all()
    serializer_class = TranscriptionSerializer
    permission_classes = [IsAuthenticated]

# Ensuring CSRF token is set
@ensure_csrf_cookie
@require_http_methods(['GET'])
def set_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})

@csrf_exempt
@require_http_methods(['POST'])
def login_view(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        username = data['username']
        password = data['password']
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)

    user = authenticate(request, username=username, password=password)
    
    if user is None:
      print("Authentication failed. User is None.")
    if user:
        login(request, user)
        user_info = {
                    'username': user.username,
                    'email': user.email,
                    'id':user.id
                    # Add other fields if necessary
                }
        return JsonResponse({'success': True,'user':user_info})
    return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

# Logout view
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})

# Get current user information
@require_http_methods(['GET'])
def user(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username, 'email': request.user.email})
    return JsonResponse({'message': 'Not logged in'}, status=401)

@require_http_methods(['POST'])
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            print(data)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            if not username or not email or not password:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            # Check if the email is already in use
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email is already in use'}, status=400)

            # Create the user
            user = User(
                username=username,
                email=email,
                password=make_password(password)  # Hash the password
            )
            user.save()

            return JsonResponse({'message': 'User registered successfully!'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
=======
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
>>>>>>> a09a68ea8dfed890562f7050b1354fefe75e7213
