import os


from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from typing import *


load_dotenv()


class DBClient:
    def __init__(self):
        self.db_user = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_host = os.getenv("DB_HOST")
        self.db_port = os.getenv("DB_PORT")
        self.db_name = os.getenv("DB_NAME")

        self.db_uri = (
            f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:"
            f"{self.db_port}/{self.db_name}"
        )

        self.engine = create_engine(self.db_uri)

    def commit_many(self, models: List[object]):
        with Session(self.engine) as session:
            session.add_all(models)
            session.commit()
