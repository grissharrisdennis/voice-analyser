from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import AudioFileViewSet,UserAudioFilesView,get_top_unique_phrases,TranscriptionViewSet,WordFrequencyByTranscriptionIDView,set_csrf_token,login_view,logout_view,user,register,TranscriptionListByUserIDView

router = DefaultRouter()
router.register(r'audiofiles', AudioFileViewSet)
router.register(r'transcriptions', TranscriptionViewSet)

urlpatterns = [
    path('set-csrf-token/', set_csrf_token, name='set_csrf_token'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user, name='user'),
    path('register/', register, name='register'),
     path('transcriptions/uphrases/<int:user_id>/', get_top_unique_phrases, name='unique-phrases'),
    path('audiofiles/user/<int:user_id>/', UserAudioFilesView.as_view(), name='user-audiofiles'),
    path('word_frequencies/<int:transcript_id>/', WordFrequencyByTranscriptionIDView.as_view(), name='transcriptword-detail'),
     path('transcriptions/<int:user_id>/', TranscriptionListByUserIDView.as_view(), name='transcription-detail'),
    path('', include(router.urls)),  
]