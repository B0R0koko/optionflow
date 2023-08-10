from django.urls import path
from .views import CandlesApiView


urlpatterns = [
    path("candles", CandlesApiView.as_view()),
]
