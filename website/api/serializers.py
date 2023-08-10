from rest_framework.serializers import ModelSerializer
from .models import Candles


class CandleSerializer(ModelSerializer):
    class Meta:
        model = Candles
        fields = "__all__"
