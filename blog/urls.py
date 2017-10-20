from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^blog/post/(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
    url(r'^subscribe/', views.subscribe, name = "subscribe"),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
]
