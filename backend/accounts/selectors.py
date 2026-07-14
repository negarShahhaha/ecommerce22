from .models import User


def get_user_by_id(*, id):
    return User.objects.filter(pk=id).first()


def get_user_by_email(*, email):
    return User.objects.filter(email=email).first()
