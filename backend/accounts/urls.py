from django.urls import path
from . import api_views
from rest_framework import routers


app_name = 'accounts'
urlpatterns = [
    path('register/', api_views.UserRegisterView.as_view()),
    path('register/verify/', api_views.UserRegisterVerifyView.as_view()),
    path('login/', api_views.CustomAuthToken.as_view()),
    path('profile/<int:user_id>/', api_views.UserProfileView.as_view()),
]

router = routers.SimpleRouter()
router.register('users', api_views.UserViewSet)
urlpatterns += router.urls
