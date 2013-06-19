from django.db import models

class TrackType(models.Model):
    name = models.CharField(max_length=256)
    slug = models.CharField(max_length=256)

class Track(models.Model):
    sid = models.CharField(max_length=256)
    ext_id = models.CharField(max_length=256)
    name = models.CharField(max_length=1024)
    time_point = models.DateTimeField()
    type = models.ForeignKey(TrackType)
    duration = models.IntegerField(default=0)