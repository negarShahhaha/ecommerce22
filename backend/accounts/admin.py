from django.contrib import admin
from .models import User, PreSaveUser, Otp, Profile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class ProfileInline(admin.StackedInline):
    model = Profile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

    list_display = ('id', 'email', 'username', 'is_active', 'is_staff', 'is_superuser',)


@admin.register(PreSaveUser)
class PreSaveUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'created')


@admin.register(Otp)
class OtpAdmin(admin.ModelAdmin):
    list_display = ('email', 'code', 'created')
