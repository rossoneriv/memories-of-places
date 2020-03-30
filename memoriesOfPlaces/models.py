from django.conf import settings
from django.db import models
from django.utils import timezone

class Memories(models.Model):
    key = models.CharField(max_length=100)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lat = models.CharField(max_length=20)
    lon = models.CharField(max_length=20)
    place = models.CharField(max_length=100)
    mem_date = models.CharField(max_length=10)
    mem_contents = models.TextField()
    reg_dttm = models.DateTimeField(default=timezone.now)

