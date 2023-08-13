# Generated by Django 4.2.4 on 2023-08-11 14:52

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Candles",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("open", models.FloatField(max_length=5)),
                ("close", models.FloatField(max_length=5)),
                ("high", models.FloatField(max_length=5)),
                ("low", models.FloatField(max_length=5)),
                ("value", models.FloatField(max_length=5)),
                ("volume", models.IntegerField()),
                ("begin", models.DateTimeField()),
                ("end", models.DateTimeField()),
                ("ticker", models.CharField(max_length=20)),
            ],
            options={
                "db_table": "candles",
            },
        ),
    ]