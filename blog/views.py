# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, get_object_or_404
from blog.models import Post
from django.utils import timezone
from django.http import HttpResponse, JsonResponse
from .models import Subscribe
from .utils import SendSubscribeMail

def subscribe(request):
    if request.method == 'POST':
        email = request.POST['email_id']
        email_qs = Subscribe.objects.filter(email_id = email)
        if email_qs.exists():
            data = {"status" : "404"}
            return JsonResponse(data)
        else:
            Subscribe.objects.create(email_id = email)
            SendSubscribeMail(email) # Send the Mail, Class available in utils.py
    return HttpResponse("/")

def index(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'index.html', {'posts': posts})

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts':posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'post_detail.html', {'post': post})
