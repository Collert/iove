from django.urls import path
from . import views

urlpatterns = [
    path('', views.GetCookie.as_view()),
    path('basic-info', views.GetBasicInfo.as_view()),
    path("login", views.LoginView.as_view()),
    path("register", views.Register.as_view()),
    # path("register", views.register),# type: ignore
    path("profile", views.Profile.as_view()),
    path("serve", views.ServeUsers.as_view()),
    path("decision", views.SubmitDecision.as_view()),
    path("chats", views.ServeChats.as_view()),
    path("send_message", views.SendMessage.as_view()),
]