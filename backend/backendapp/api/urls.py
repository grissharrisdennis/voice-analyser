<<<<<<< HEAD
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
=======
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import AudioFileViewSet, TranscriptionViewSet

router=DefaultRouter()
router.register(r'audiofiles', AudioFileViewSet)
router.register(r'transcriptions', TranscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
>>>>>>> a09a68ea8dfed890562f7050b1354fefe75e7213
]