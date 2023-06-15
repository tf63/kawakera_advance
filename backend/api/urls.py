from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("animal/", views.AnimalAPIView.as_view(), name="animal"),
    path("", views.index, name="index"),
]
