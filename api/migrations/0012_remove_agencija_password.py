# Generated by Django 4.0.4 on 2022-06-07 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_delete_article'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agencija',
            name='password',
        ),
    ]
