from django.urls import path
from .import api_views


app_name = 'home'
urlpatterns = [
    path('', api_views.HomeView.as_view())
]
