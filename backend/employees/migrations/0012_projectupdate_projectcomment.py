# Generated by Django 5.1.6 on 2025-07-09 18:28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0011_remove_task_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectUpdate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('update_text', models.TextField(max_length=500)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.employee')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='employees.project')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('update', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='employees.projectupdate')),
            ],
        ),
    ]
