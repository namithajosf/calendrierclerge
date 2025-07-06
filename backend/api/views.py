import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.http import JsonResponse
import jwt

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        logger.info(f"Login attempt for email: {email}")

        user = authenticate(request, email=email, password=password)

        if user:
            logger.info(f"User {email} authenticated successfully.")
            refresh = RefreshToken.for_user(user)
            response = Response({"message": "Login successful"})
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                value=str(refresh.access_token),
                httponly=True,
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            )
            return response

        logger.warning(f"Login failed for email: {email}")
        return Response({"error": "Invalid credentials"}, status=401)

class LogoutView(APIView):
    def post(self, request):
        logger.info("Logout request received.")
        response = Response({"message": "Logged out"})
        response.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        return response

@api_view(["GET"])
def get_user(request):
    token = request.COOKIES.get("access_token")

    if not token:
        logger.warning("No access token found in cookies.")
        return JsonResponse({"detail": "Authentication credentials were not provided."}, status=401)

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(id=user_id)

        logger.info(f"User data retrieved for user_id: {user_id}")
        return JsonResponse({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
        })
    except jwt.ExpiredSignatureError:
        logger.warning("Token expired.")
        return JsonResponse({"detail": "Token expired."}, status=401)
    except jwt.InvalidTokenError:
        logger.error("Invalid token.")
        return JsonResponse({"detail": "Invalid token."}, status=401)
