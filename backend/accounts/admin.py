from django.contrib import admin
from .models import User, PreSaveUser, Otp


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'is_active', 'is_staff', 'is_superuser',)


@admin.register(PreSaveUser)
class PreSaveUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'created')


@admin.register(Otp)
class OtpAdmin(admin.ModelAdmin):
    list_display = ('email', 'code', 'created')
