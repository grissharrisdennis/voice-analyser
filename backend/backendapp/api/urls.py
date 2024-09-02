from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import AudioFileViewSet,UserAudioFilesView,UserDetailView,TranscriptionListByUserIDView,WordFrequencyByTranscriptionIDView
from .views import custom_token_auth,get_top_unique_phrases,register
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'audiofiles', AudioFileViewSet)

urlpatterns = [
    path('token-auth/', custom_token_auth, name='token_auth'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailView.as_view(), name='user'),
    path('register/', register, name='register'),
     path('transcriptions/uphrases/<int:user_id>/', get_top_unique_phrases, name='unique-phrases'),
    path('audiofiles/user/<int:user_id>/', UserAudioFilesView.as_view(), name='user-audiofiles'),
    path('word_frequencies/<int:transcript_id>/', WordFrequencyByTranscriptionIDView.as_view(), name='transcriptword-detail'),
     path('transcriptions/<int:user_id>/', TranscriptionListByUserIDView.as_view(), name='transcription-detail'),
    path('', include(router.urls)),  
]
