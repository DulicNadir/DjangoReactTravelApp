# Generated by Django 4.0.4 on 2022-06-03 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_korisnikovaputovanja_agencija_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='putovanje',
            name='datum_zavrsetka',
            field=models.DateField(null=True),
        ),
    ]
