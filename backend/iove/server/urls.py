from django.urls import path
from . import views

urlpatterns = [
    path('', views.wsTest),
    path("basic-info", views.get_basic_info),# type: ignore
    path("login", views.login_route),# type: ignore
    path("register", views.register),# type: ignore
    path("profile", views.profile),# type: ignore
]