from django.contrib import admin
from .models import Employee

# Register your models here.
    
    
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'get_email',
        'phone',
        'designation',
        'salary',
        'is_active',
        'created_at'
    )
    search_fields = ('name', 'user__email')
    list_filter = ('designation', 'is_active')

    @admin.display(description='Email')
    def get_email(self, obj):
        return obj.user.email    