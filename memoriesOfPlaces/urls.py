from django.urls import path
from . import views

urlpatterns = [
    path('', views.memories_list, name='memories_list'),
]