from parser.clients import WebClient, DBClient, Request
from parser.models import Candle

from typing import *


db_client = DBClient()


class CandleRequest(Request):
    def on_failure(self, exc):
        return super().on_failure(exc)

    def on_response(self, response: Dict[str, Any]):
        data = response["candles"]["data"]
        cols = response["candles"]["columns"]

        print("Sent http request")

        models = []

        for row in data:
            data_dict = dict(zip(cols, row))
            models.append(
                Candle(
                    open=data_dict["open"],
                    close=data_dict["close"],
                    high=data_dict["high"],
                    low=data_dict["low"],
                    volume=data_dict["volume"],
                    value=data_dict["value"],
                    begin=data_dict["begin"],
                    end=data_dict["end"],
                    ticker=self.meta["ticker"],
                )
            )

        db_client.commit_many(models)


def main():
    reqs = [
        CandleRequest(
            endpoint="https://iss.moex.com/iss/engines/stock/markets/shares/securities/GAZP/candles.json",
            params={
                "from": "2022-01-01",
                "till": "2023-08-03",
                "interval": "60",
                "start": start,
            },
            meta={"ticker": "GAZP"},
            rps=2,
        )
        for start in range(0, 10000, 500)
    ]

    client = WebClient()
    client.fetch_all(reqs)


if __name__ == "__main__":
    main()
