from rest_framework import serializers
from .models import User
from .models import PreSaveUser, Otp
from datetime import timedelta
from django.utils import timezone
from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='id', read_only=True)
    user_email = serializers.EmailField(source='email', read_only=True)
    admin = serializers.BooleanField(source='is_staff')
    superuser_status = serializers.BooleanField(source='is_superuser', read_only=True)

    class Meta:
        model = User
        fields = ['user_id', 'user_email', 'username', 'date_joined', 'is_active', 'admin', 'superuser_status']


class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate(self, data):
        """Checks if passwords match

        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('passwords must match')
        return data

    def validate_email(self, value):
        """Checks if a user with this email has already registered

        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A User With this email already exists')
        return value

    def validate_username(self, value):
        """Checks if a user with this username has already registered

        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('A User With this username already exists')
        return value


class OtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.IntegerField()

    def validate(self, attrs):
        """Validate the email/code pair for registration verification.

        This method checks that:
            a pending user registration exists for the given email
            an OTP record exists for the given email
            the submitted OTP code matches the stored code
            the OTP has not expired

        On success, the related `PreSaveUser` and `Otp` instances are attached
        to `attrs` as `user_data` and `otp` so the view can use them without
        querying again.
        """
        email = attrs['email']
        code = attrs['code']

        try:
            attrs['user_data'] = PreSaveUser.objects.get(email=email)
            attrs['code_instance'] = Otp.objects.get(email=email)
        except PreSaveUser.DoesNotExist:
            raise serializers.ValidationError('Email is not valid')
        except Otp.DoesNotExist:
            raise serializers.ValidationError('Email is not valid')

        if 10000 > code or code > 99999:
            raise serializers.ValidationError('verification code is a 5 digit number')

        if attrs['code_instance'].code != code:
            raise serializers.ValidationError('invalid otp code')

        if attrs['code_instance'].created + timedelta(minutes=3) < timezone.now():
            raise serializers.ValidationError('otp code is expired')

        return attrs

    def validate_email(self, value):
        """Checks if a user with this email has already registered(being sure not necessary)

        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is not valid anymore')
        return value


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    updated = serializers.DateTimeField(read_only=True)
    created = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Profile
        fields = ['avatar', 'bio', 'date_of_birth', 'updated', 'created', 'user']

    def get_user(self, obj):
        user_info = User.objects.get(id=obj.user.id)
        return UserSerializer(instance=user_info).data
