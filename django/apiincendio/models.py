from django.db import models

class Report(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    file = models.ImageField(upload_to='images/')
    date = models.DateTimeField()
    desc = models.CharField(max_length=200)

    def image_img(self):
        return u'<img src="%s" width="50" height="50" />' % self.file.url
    