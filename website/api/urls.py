from django.urls import path

from .views import CandlesApiView, AuthUserApiView


urlpatterns = [
    path("candles", CandlesApiView.as_view()),
    path("auth-user", AuthUserApiView.as_view()),
]
