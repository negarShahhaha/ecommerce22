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
from rest_framework.permissions import IsAdminUser, IsAuthenticated
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

    @extend_schema(request=None, responses={
        200: ProfileSerializer
    })
    def get(self, request, user_id):
        profile = get_profile_by_user_id(user_id=user_id)
        self.check_object_permissions(request, profile)
        serializer = ProfileSerializer(instance=profile)
        return Response(data=serializer.data)

    @extend_schema(request=ProfileSerializer, responses={
        200: ProfileSerializer
    })
    def patch(self, request, user_id):
        profile = get_profile_by_user_id(user_id=user_id)
        self.check_object_permissions(request, profile)
        serializer = ProfileSerializer(instance=profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        remove_image = serializer.validated_data.get('remove_image', False)
        if remove_image:
            if profile.avatar:
                profile.avatar.delete(save=False)
            profile.avatar = None
            profile.save(update_fields=['avatar'])

        serializer.save()
        return Response(data=serializer.data)


class UserSelfProfileView(APIView):
    """
    Update the authenticated user's profile.

    Frontend request guide:
    - Send this request as `multipart/form-data` if uploading a new profile image.
    - Upload the file using the `image` field name.
    - Accepted file type: image files such as `.jpg`, `.jpeg`, `.png`, or `.webp`.
    - You can also send `bio` and `date_of_birth` in the same request.
    - This endpoint supports partial updates; send only the fields you want to change.
    - If you want to delete image send `remove_image: true` otherwise no need to send it.

    Frontend response guide:
    - Returns the updated profile object.
    - `image_path` is a temporary presigned URL for displaying or downloading the avatar.
    - Do not store `image_path` permanently because it expires.
    - If no avatar exists, `image_path` is `null`.

    :param request: Partial profile update for the authenticated user.
    :return: Updated profile data.
    """
    permission_classes = [IsAuthenticated]

    @extend_schema(request=None, responses={
        200: ProfileSerializer
    })
    def get(self, request):
        serializer = ProfileSerializer(instance=request.user.profile)
        return Response(data=serializer.data)

    @extend_schema(request=ProfileSerializer, responses={
        200: ProfileSerializer
    })
    def patch(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(instance=profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        remove_image = serializer.validated_data.get('remove_image', False)
        if remove_image:
            if profile.avatar:
                profile.avatar.delete(save=False)
            profile.avatar = None
            profile.save(update_fields=['avatar'])

        serializer.save()
        return Response(data=serializer.data)


class UserViewSet(viewsets.ViewSet):
    queryset = get_all_users()
    permission_classes = [IsAdminUser]
    pagination_class = CustomPagination

    @extend_schema(request=None, responses={200: UserSerializer})
    def list(self, request):
        """Only users with `admin status` can access this endpoint

        Retrieves a list of users with pagination.

        - Query Parameters:
             page (int): The page number to retrieve. Defaults: 1.
             limit (int): The number of users to display per page. Default: 10.

            example: `accounts/users/?page=1&limit=10/`  `accounts/users/?page=2&limit=10/`

        :param request:
        :return:
        """
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(self.queryset, request, view=self)

        if page is not None:
            serializer = UserSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = UserSerializer(self.queryset, many=True)
        return Response(serializer.data)

    @extend_schema(request=None, responses={200: UserSerializer})
    def retrieve(self, request, pk=None):
        """Only users with `admin status` can access this endpoint

        - retrieve the user data with the provided user_id

        :param request:
        :param pk:
        :return:
        """
        user = get_user_by_id(id=pk)
        return Response(data=UserSerializer(instance=user).data)

    @extend_schema(request=None, responses={200: UserSerializer})
    def partial_update(self, request, pk=None):
        """Only users with `admin status` can access this endpoint

        - This endpoint supports partial updates; send only the fields you want to change.
        - You can Change A user `Admin status` using this endpoint
        - `Superuser status` can not be changed through this endpoint

        :param request:
        :param pk:
        :return:
        """
        user = get_user_by_id(id=pk)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=serializer.data)

    def destroy(self, request, pk=None):
        """Only users with `admin status` can access this endpoint

        - User with `superuser status` can not be deleted

        :param request:
        :param pk:
        :return:
        """
        user = get_user_by_id(id=pk)
        if user.is_superuser:
            return Response(status=status.HTTP_403_FORBIDDEN)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
