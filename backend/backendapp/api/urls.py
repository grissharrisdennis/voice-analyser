from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import AudioFileViewSet, TranscriptionViewSet

router=DefaultRouter()
router.register(r'audiofiles', AudioFileViewSet)
router.register(r'transcriptions', TranscriptionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]