from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("image/", views.ImageAPIView.as_view(), name="image"),
    path("category/", views.CategoryAPIView.as_view(), name="category"),
    # path("", views.index, name="index"),
]
