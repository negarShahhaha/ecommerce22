from .models import User, Profile


def get_all_users():
    return User.objects.all()


def get_user_by_id(*, id):
    return User.objects.get(id=id)


def get_user_by_email(*, email):
    return User.objects.filter(email=email).first()


def get_profile_by_user_id(*, user_id):
    return Profile.objects.get(user__id=user_id)
