import asyncio
import aiohttp

from abc import ABC, abstractmethod
from typing import *


# Request constructor
class Request(ABC):
    def __init__(
        self,
        rps: int,
        endpoint: str,
        params: Dict[str, Any] = None,
        meta: Dict[str, Any] = None,
    ):
        self.endpoint = endpoint
        self.params = params
        self.meta = meta
        self.semaphore = asyncio.Semaphore(rps)

    @abstractmethod
    def on_failure(self, exc):
        ...

    @abstractmethod
    def on_response(self, response):
        ...


class WebClient:
    def __init__(self):
        ...

    async def _fetch(self, request: Request) -> Dict[str, Any]:
        async with request.semaphore:
            try:
                resp: aiohttp.ClientResponse = await self.session.get(
                    url=request.endpoint, params=request.params
                )
                resp.raise_for_status()

                resp = await resp.json()
                request.on_response(resp)

            except aiohttp.ClientConnectionError as exc:
                request.on_failure(exc)
            finally:
                await asyncio.sleep(1)

    async def _fetch_all(self, requests: List[Request]):
        tasks = [self._fetch(request) for request in requests]

        async with aiohttp.ClientSession() as self.session:
            for task in asyncio.as_completed(tasks):
                await task

    def fetch_all(self, requests: List[Request]):
        asyncio.run(self._fetch_all(requests))


if __name__ == "__main__":

    class MyRequest(Request):
        def on_failure(self, exc):
            return super().on_failure(exc)

        def on_response(self, response):
            print("Received data")

    req = MyRequest(
        endpoint="https://iss.moex.com/iss/history/engines/futures/markets/options/securities/GZ170CH3A/trades.json",
        params=None,
        rps=5,
    )

    client = WebClient()
    client.fetch_all([req] * 10)
