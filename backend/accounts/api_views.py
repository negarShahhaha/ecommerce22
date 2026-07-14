from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, OtpSerializer, UserSerializer
from .models import PreSaveUser, Otp, User
from rest_framework import status
from .services import send_otp_email, create_user
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers


class UserRegisterView(APIView):
    @extend_schema(request=UserRegisterSerializer, responses=None)
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)  # deserialize
        serializer.is_valid(raise_exception=True)
        PreSaveUser.objects.update_or_create(
            email=serializer.validated_data['email'],
            defaults={
                'username': serializer.validated_data['username'],
                'password': serializer.validated_data['password'],
            }
        )
        otp_instance = Otp.objects.filter(email=serializer.validated_data['email'])
        if otp_instance.exists():
            otp_instance.delete()
        code_instance = Otp.generate_random_code()
        send_otp_email(email=serializer.validated_data['email'], code=code_instance)
        Otp.objects.create(
            email=serializer.validated_data['email'],
            code=code_instance,
        )
        return Response(data={'message': 'Otp code has been sent'}, status=status.HTTP_200_OK)


class UserRegisterVerifyView(APIView):
    @extend_schema(request=OtpSerializer, responses=UserSerializer)
    def post(self, request):
        serializer = OtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user_data = PreSaveUser.objects.get(email=serializer.validated_data['email'])
            code_instance = Otp.objects.get(email=serializer.validated_data['email'])
        except Exception:
            raise ValidationError('Email is not valid')
        if code_instance.code == serializer.validated_data['code']:
            if timezone.now() <= code_instance.created + timedelta(minutes=3):
                user = create_user(email=user_data.email, username=user_data.username, password=user_data.password)
                user_data.delete()
                code_instance.delete()
                return Response(data=UserSerializer(instance=user).data, status=status.HTTP_201_CREATED)
            else:
                return Response(data={'message': 'code is expired'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        return Response(data={'message': 'code is wrong'}, status=status.HTTP_406_NOT_ACCEPTABLE)


class CustomAuthToken(ObtainAuthToken):
    @extend_schema(request=ObtainAuthToken.serializer_class, responses={
        200: inline_serializer(
            name='LoginResponse',
            fields={
                'user_id': serializers.CharField(),
                'token': serializers.UUIDField(),
                'email': serializers.EmailField(),
            }
        )
    })
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user_id': user.pk,
            'token': token.key,
            'email': user.email
        })
