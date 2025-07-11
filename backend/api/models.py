from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
# === STATUS ENUMS ===

class StatusChoices(models.TextChoices):
    ACTIVE = 'Active', 'Active'
    INACTIVE = 'Inactive', 'Inactive'


class EventStatusChoices(models.TextChoices):
    SCHEDULED = 'Scheduled', 'Scheduled'
    COMPLETED = 'Completed', 'Completed'
    CANCELLED = 'Cancelled', 'Cancelled'


class RoleChoices(models.TextChoices):
    SUPERUSER = 'Superuser', 'Superuser'
    PRIEST = 'Priest', 'Priest'
    PUBLIC = 'Public', 'Public'

# === CUSTOM USER MANAGER ===

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, username, password, **extra_fields)


# === USER ===

class UserRegistration(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)

    role = models.CharField(max_length=20, choices=RoleChoices.choices, default=RoleChoices.PUBLIC)
    status = models.CharField(max_length=10, choices=StatusChoices.choices, default=StatusChoices.ACTIVE)

    parish = models.ForeignKey("Parish", on_delete=models.SET_NULL, null=True, blank=True, related_name="users")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    @property
    def is_priest(self):
        return self.role == RoleChoices.PRIEST
    
    groups = models.ManyToManyField(
        Group,
        related_name='userregistration_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='userregistration_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )


# === PARISH ===
class Parish(models.Model):
    parish_name = models.CharField(max_length=255, unique=True)
    parent_parish = models.CharField(max_length=255, blank=True, null=True)
    secretary_name = models.CharField(max_length=255, blank=True, null=True)
    place_of_parish = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)

    status = models.CharField(max_length=10, choices=StatusChoices.choices, default=StatusChoices.ACTIVE)

    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.parish_name

    class Meta:
        ordering = ['parish_name']