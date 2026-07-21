from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, OtpSerializer, UserSerializer, ProfileSerializer
from .models import PreSaveUser, Otp
from rest_framework import status
from .services import send_otp_email, create_user
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers
from django.db import transaction
from core.permissions import IsOwnerOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from .selectors import get_profile_by_user_id, get_all_users, get_user_by_id
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from core.paginators import CustomPagination


class UserRegisterView(APIView):
    @extend_schema(request=UserRegisterSerializer, responses=None)
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)  # deserialize
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        PreSaveUser.objects.update_or_create(
            email=email,
            defaults={
                'username': username,
                'password': password,
            }
        )

        Otp.objects.filter(email=email).delete()
        random_code = Otp.generate_random_code()
        send_otp_email(email=email, code=random_code)
        Otp.objects.create(
            email=email,
            code=random_code,
        )
        return Response(data={'message': 'Otp code has been sent'}, status=status.HTTP_200_OK)


class UserRegisterVerifyView(APIView):
    @extend_schema(request=OtpSerializer, responses=UserSerializer)
    def post(self, request):
        serializer = OtpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_data = serializer.validated_data['user_data']
        code_instance = serializer.validated_data['code_instance']
        with transaction.atomic():
            user = create_user(email=user_data.email, username=user_data.username, password=user_data.password)
            user_data.delete()
            code_instance.delete()
        return Response(data=UserSerializer(instance=user).data, status=status.HTTP_201_CREATED)


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


class UserProfileView(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, user_id):
        profile = get_profile_by_user_id(user_id=user_id)
        self.check_object_permissions(request, profile)
        serializer = ProfileSerializer(instance=profile)
        return Response(data=serializer.data)

    def patch(self, request, user_id):
        profile = get_profile_by_user_id(user_id=user_id)
        self.check_object_permissions(request, profile)
        serializer = ProfileSerializer(instance=profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)


class UserViewSet(viewsets.ViewSet):
    queryset = get_all_users()
    permission_classes = [IsAdminUser]
    pagination_class = CustomPagination

    def list(self, request):
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(self.queryset, request, view=self)

        if page is not None:
            serializer = UserSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_user_by_id(id=pk)
        return Response(data=UserSerializer(instance=user).data)

    def partial_update(self, request, pk=None):
        user = get_user_by_id(id=pk)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        user = get_user_by_id(id=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
