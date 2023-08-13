from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CandleSerializer
from .models import Candles, User

from typing import *


# Query candl data endpoint
class CandlesApiView(APIView):
    queryset = Candles.objects.all()
    serializer_class = CandleSerializer

    def get(self, request):
        ticker, offset, limit = [
            request.GET.get(param) for param in ["ticker", "offset", "limit"]
        ]

        bad_request = Response(
            {"Ticker not found": "Please specify which ticker you want to get"},
            status=status.HTTP_400_BAD_REQUEST,
        )

        if ticker:
            matched_data = Candles.objects.filter(ticker=ticker).order_by("begin")
            lb = len(matched_data) - int(limit) - int(offset)
            rb = len(matched_data) - int(offset)
            matched_data = matched_data[lb:rb]

            if matched_data:
                data = self.serializer_class(matched_data, many=True).data
                data = {"meta": {"limit": limit, "offset": offset}, "data": data}
                return Response(data)
            return bad_request

        return bad_request


class HttpMessage:
    def __init__(self, message: str, status):
        self.message = message
        self.status = status

    @property
    def body(self) -> Dict[str, Any]:
        return {"status": self.status, "message": self.message}


class AuthUserApiView(APIView):
    users = User.objects.all()

    def post(self, request):
        email, password = request.data.get("email"), request.data.get("password")
        matched_user: Union[List[User], None] = self.users.filter(email=email)

        # User does not exist in the database
        if not matched_user:
            code = status.HTTP_404_NOT_FOUND
            return Response(
                HttpMessage(
                    message="No user with provided credentials", status=code
                ).body,
                status=code,
            )
        # unpack matched user
        matched_user: User = matched_user[0]
        # wrong credentials for existing user
        if matched_user.password != password:
            code = status.HTTP_401_UNAUTHORIZED
            return Response(
                HttpMessage(
                    message="Wrong credentials for this user", status=code
                ).body,
                status=code,
            )
        #  all good
        code = status.HTTP_200_OK
        return Response(
            HttpMessage(message="Authentication success", status=code).body, status=code
        )
