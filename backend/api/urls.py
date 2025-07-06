from django.urls import path
from .views import *

urlpatterns = [
    path('api/parishes/', parish_list),
    path('api/user/', get_user_details, name='get_user_details'),
]