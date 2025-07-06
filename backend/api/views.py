from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import Parish
from .serializers import ParishSerializer

@api_view(['GET'])
def parish_list(request):
    parishes = Parish.objects.all()
    serializer = ParishSerializer(parishes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)
