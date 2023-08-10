from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CandleSerializer
from .models import Candles


class CandlesApiView(APIView):
    queryset = Candles.objects.all()
    serializer_class = CandleSerializer

    def get(self, request):
        ticker = request.GET.get("ticker")

        bad_request = Response(
            {"Ticker not found": "Please specify which ticker you want to get"},
            status=status.HTTP_400_BAD_REQUEST,
        )

        if ticker:
            matched_data = Candles.objects.filter(ticker=ticker).order_by("begin")
            if matched_data:
                return Response(self.serializer_class(matched_data, many=True).data)
            return bad_request

        return bad_request
