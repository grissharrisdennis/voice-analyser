from rest_framework.response import Response
from rest_framework import status, viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from ..models import AudioFile, Transcription,WordFrequency
from .serializers import AudioFileSerializer, TranscriptionSerializer, AudioFileDetailSerializer,UserModelSerializer,WordFrequencySerializer
from pydub import AudioSegment
from django.contrib.auth.models import User
import speech_recognition as sr
import tempfile
from django.http import JsonResponse
from rest_framework.exceptions import NotFound
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect,csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
import os
from django.contrib.auth.hashers import make_password
import nltk
nltk.download('punkt_tab')
from nltk.tokenize import word_tokenize
from collections import Counter
from nltk import ngrams
from rest_framework_simplejwt.settings import api_settings
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


def normalize(text):
    return text.lower().split()

def get_ngrams(text, n=3):
    words = normalize(text)
    return list(ngrams(words, n))

def unique_phrases(user_ngrams, all_users_ngrams):
    user_ngrams_freq = Counter(user_ngrams)
    all_users_ngrams_freq = Counter(all_users_ngrams)

    unique = {phrase: freq for phrase, freq in user_ngrams_freq.items() if all_users_ngrams_freq[phrase] == 0}
    return sorted(unique, key=unique.get, reverse=True)[:3]

@require_http_methods(['GET'])
def get_top_unique_phrases(request, user_id):
    user_transcripts = Transcription.objects.filter(user_id=user_id)
    all_transcripts = Transcription.objects.exclude(user_id=user_id)

    user_ngrams = []
    all_users_ngrams = []

    for transcript in user_transcripts:
        user_ngrams.extend(get_ngrams(transcript.text, n=3))

    for transcript in all_transcripts:
        all_users_ngrams.extend(get_ngrams(transcript.text, n=3))

    top_unique_phrases = unique_phrases(user_ngrams, all_users_ngrams)

    # Convert tuples to string for JSON response
    top_unique_phrases = [' '.join(phrase) for phrase in top_unique_phrases]

    return JsonResponse({'top_unique_phrases': top_unique_phrases})

class WordFrequencyByTranscriptionIDView(generics.ListAPIView):
    serializer_class = WordFrequencySerializer

    def get_queryset(self):
        transcription_id = self.kwargs.get('transcript_id')
        queryset = WordFrequency.objects.filter(transcription_id=transcription_id).order_by('-frequency')[:8]
        if not queryset.exists():
            raise NotFound("No word frequencies found for the provided transcription_id.")

        return queryset


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
            # Save the audio file with the associated user
            audio_file = serializer.save(user=request.user)

            # Transcribe the audio file
            transcription_text = transcribe_audio(audio_file.audio)

            # Create the transcription and associate it with the user
            transcription = Transcription.objects.create(
                audio_file=audio_file,
                text=transcription_text,
                user=request.user  # Associate the transcription with the current user
            )

            # Tokenize and calculate word frequencies
            tokens = word_tokenize(transcription_text.lower())
            tokens = [word for word in tokens if word.isalpha()]  # Remove punctuation
            word_freq = Counter(tokens)

            # Save the word frequencies
            for word, freq in word_freq.items():
                WordFrequency.objects.create(transcription=transcription, word=word, frequency=freq)

            # Serialize the transcription data and return the response
            transcription_serializer = TranscriptionSerializer(transcription)
            return Response(transcription_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserAudioFilesView(generics.ListAPIView):
    serializer_class = AudioFileDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return AudioFile.objects.filter(user_id=user_id)


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user




class TranscriptionListByUserIDView(generics.ListAPIView):
    serializer_class = TranscriptionSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        transcript=Transcription.objects.filter(user_id=user_id)
        return transcript


class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)



@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if not username or not email or not password:
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email is already in use'}, status=400)

            user = User(
                username=username,
                email=email,
                password=make_password(password)  # Hash the password
            )
            user.save()

            # Automatically login the user and issue a token
            user = authenticate(username=username, password=password)
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)

            return JsonResponse({
                'message': 'User registered successfully!',
                'token': token  # Return the JWT token
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)


@csrf_exempt
@require_http_methods(['POST'])
@ensure_csrf_cookie
@api_view(['POST'])
@permission_classes([AllowAny])
def custom_token_auth(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'token': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

