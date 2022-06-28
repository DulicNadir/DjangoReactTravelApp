# Generated by Django 4.0.4 on 2022-05-28 17:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_agencija_password'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agencija',
            old_name='naziv',
            new_name='agencyname',
        ),
        migrations.AddField(
            model_name='agencija',
            name='phnumber',
            field=models.CharField(default=None, max_length=30),
        ),
        migrations.AlterField(
            model_name='agencija',
            name='email',
            field=models.EmailField(max_length=100),
        ),
        migrations.AlterField(
            model_name='agencija',
            name='password',
            field=models.CharField(max_length=20),
        ),
        migrations.CreateModel(
            name='Putovanje',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datum', models.DateField(null=True)),
                ('naziv', models.CharField(max_length=100)),
                ('opis', models.CharField(max_length=200)),
                ('tip', models.CharField(max_length=100)),
                ('prevoz', models.CharField(max_length=100)),
                ('maxbroj', models.IntegerField(null=True)),
                ('cijena', models.IntegerField(null=True)),
                ('agencija', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='api.agencija')),
            ],
        ),
    ]