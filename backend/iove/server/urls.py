from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('login', views.index),
    path('register', views.index),
    path('messages', views.index),
    path('profile', views.index),
    # path("basic-info", views.get_basic_info),# type: ignore
    # path("login", views.login_route),# type: ignore
    # path("register", views.register),# type: ignore
    # path("profile", views.profile),# type: ignore
]