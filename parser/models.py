from sqlalchemy import Column, Integer, Float, DateTime, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# define canlde
class Candle(Base):
    __tablename__ = "candles"

    id = Column(Integer, primary_key=True)
    open = Column(Float(5), nullable=False)
    close = Column(Float(5), nullable=False)
    high = Column(Float(5), nullable=False)
    low = Column(Float(5), nullable=False)
    value = Column(Float(5), nullable=False)
    volume = Column(Integer, nullable=False)
    begin = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=False)
    ticker = Column(String(10), nullable=False)


if __name__ == "__main__":
    from sqlalchemy import create_engine
    from dotenv import load_dotenv

    import os

    load_dotenv()

    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME")

    db_uri = f"postgresql://{db_user}:{db_password}@{db_host}:" f"{db_port}/{db_name}"

    engine = create_engine(db_uri)

    Base.metadata.create_all(engine)
