from rest_framework import permissions
from rest_framework.permissions import BasePermission

class IsAdminOrSelf(permissions.BasePermission):
    """
    Custom permission:
    - Admins (role='admin') can access all employee data.
    - Regular users (role='employee') can only access their own profile.
    """

    def has_permission(self, request, view):
        # Allow access only to authenticated users
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Allow access if the user is admin (custom role)
        if request.user.role == 'admin':
            return True

        # Allow access only to the employee's own data
        return obj.user == request.user

class IsCustomAdmin(BasePermission):
    """
    Allows access only to users with role='admin'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'role', '') == 'admin'