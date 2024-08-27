from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import AudioFileViewSet,UserAudioFilesView,TranscriptionViewSet,set_csrf_token,login_view,logout_view,user,register

router = DefaultRouter()
router.register(r'audiofiles', AudioFileViewSet)
router.register(r'transcriptions', TranscriptionViewSet)

urlpatterns = [
    path('set-csrf-token/', set_csrf_token, name='set_csrf_token'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user, name='user'),
    path('register/', register, name='register'),
    path('audiofiles/user/<int:user_id>/', UserAudioFilesView.as_view(), name='user-audiofiles'),
    # path('audiofiles/<int:pk>/', AudioFileDetailView.as_view(), name='audiofile-detail'),
    #  path('transcriptions/<int:pk>/', TranscriptionDetailView.as_view(), name='transcription-detail'),
    path('', include(router.urls)),  
]