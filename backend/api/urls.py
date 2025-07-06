from django.urls import path
from .views import *

urlpatterns = [
    path('parishes/', parish_list),
    path('user/', get_user_details, name='get_user_details'),
]