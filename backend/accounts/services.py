from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from .models import User


def create_user(*, email, username, password):
    user = User(email=email, username=username)
    user.set_password(password)
    user.save()
    return user


def send_otp_email(*, email, code):
    html_content = render_to_string('accounts/otp.html', {'email': email, 'code': code})
    email = EmailMultiAlternatives(
        subject=f'Verification Code {code}',
        body=f'Your verification code: {code}',
        from_email=f"SHOP <{settings.EMAIL_HOST_USER}>",
        to=[email],
    )
    email.attach_alternative(html_content, "text/html")
    email.send()
