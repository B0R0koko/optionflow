from django.db import models


class Candles(models.Model):
    id = models.AutoField(primary_key=True)
    open = models.FloatField(max_length=5)
    close = models.FloatField(max_length=5)
    high = models.FloatField(max_length=5)
    low = models.FloatField(max_length=5)
    value = models.FloatField(max_length=5)
    volume = models.IntegerField()
    begin = models.DateTimeField()
    end = models.DateTimeField()
    ticker = models.CharField(max_length=20)

    class Meta:
        db_table = "candles"


class User(models.Model):
    id = models.AutoField(primary_key=True)
    joined_at = models.DateTimeField(auto_now_add=True)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=30)

    class Meta:
        db_table = "users"
