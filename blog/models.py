# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

class Post(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=100)
    photo = models.ImageField(upload_to = 'pic_folder/', default = 'pic_folder/no-image.png')
    text = RichTextUploadingField(config_name='awesome_ckeditor') #RichTextField(config_name='awesome_ckeditor',null=True,blank=True)
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now
        self.save()

    def __str__(self):
        return self.title

    @property
    def photo_url(self):
        if self.photo and hasattr(self.photo, 'url'):
            return self.photo.url


class Subscribe(models.Model):
    email_id = models.EmailField(null = True, blank = True)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.email_id
