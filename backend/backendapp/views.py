from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import AudioFile
#openai.api_key='sk-uNHcRTMzIxbBoAYsficC8P4FGjVDHjHIi5FpPuUI6tT3BlbkFJGxDHEdvvZVXXm8OMixWBwkW87TyaT0KEO9-TSMinkA'
class AudioUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('audio')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        audio_file = AudioFile.objects.create(audio=file_obj)
        return Response(status=status.HTTP_201_CREATED)

