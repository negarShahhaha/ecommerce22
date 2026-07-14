from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'date_joined', 'is_active', 'is_staff',]


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

    def validate_email(self, value):
        """Checks if a user with this email has already registered

        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is not valid anymore')
        return value

    def validate_code(self, value):
        if 10000 > value or value > 99999:
            raise serializers.ValidationError('verification code is a 5 digit number')
        return value
