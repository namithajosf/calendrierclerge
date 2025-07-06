from rest_framework import serializers
from .models import Parish, UserRegistration


class ParishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parish
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegistration
        fields = ['id', 'first_name', 'last_name', 'email', 'role']
