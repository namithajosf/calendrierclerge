from django.contrib import admin
from .models import Parish, UserRegistration

# Register your models here.
admin.site.register(UserRegistration)
admin.site.register(Parish)