from django.contrib import admin
from .models import Employee

# Register your models here.
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone', 'designation', 'salary', 'is_active', 'created_at')
    search_fields = ('name', 'email')
    list_filter = ('designation', 'is_active')
