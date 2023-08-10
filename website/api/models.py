from django.db import models


class Candles(models.Model):
    open = models.FloatField()
    close = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    value = models.FloatField()
    volume = models.IntegerField()
    begin = models.DateTimeField()
    end = models.DateTimeField()
    ticker = models.CharField(max_length=10)

    class Meta:
        managed = False
        db_table = "candles"
