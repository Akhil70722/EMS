

from rest_framework import serializers
from .models import (
    Employee, CustomUser, LeaveRequest, SalarySlip, Attendance,
    Task, TaskUpdate, ProjectUpdate, ProjectComment, Project, EmployeeTask
)

# -------------------- User Serializer --------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']
        read_only_fields = ['id', 'username', 'email', 'role']


# -------------------- Employee Serializer --------------------
# class EmployeeSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     email = serializers.EmailField(source='user.email', read_only=True)

#     class Meta:
#         model = Employee
#         fields = [
#             'id', 'user', 'email', 'name', 'phone',
#             'department', 'designation', 'salary',
#             'is_active', 'created_at', 'updated_at'
#         ]
#         read_only_fields = ['id', 'created_at', 'updated_at', 'user', 'email']

#     def validate_salary(self, value):
#         if value < 0:
#             raise serializers.ValidationError("Salary must be positive.")
#         return value

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(), write_only=True, source='user'
    )
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Employee
        fields = [
            'id', 'user', 'user_id', 'email', 'name', 'phone',
            'department', 'designation', 'salary',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'user', 'email']

    def validate_salary(self, value):
        if value < 0:
            raise serializers.ValidationError("Salary must be positive.")
        return value


# -------------------- Salary Slip Serializer --------------------
class SalarySlipSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    department = serializers.CharField(source='employee.department', read_only=True)
    designation = serializers.CharField(source='employee.designation', read_only=True)
    email = serializers.EmailField(source='employee.user.email', read_only=True)
    phone = serializers.CharField(source='employee.phone', read_only=True)

    class Meta:
        model = SalarySlip
        fields = [
            'id', 'employee', 'employee_name', 'email', 'phone',
            'department', 'designation',
            'base_salary', 'hra', 'da', 'bonus',
            'tax', 'gratuity', 'provident_fund',
            'final_salary', 'created_at'
        ]
        read_only_fields = ['gratuity', 'final_salary', 'created_at']


# -------------------- Register Serializer --------------------
class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser.objects.create_user(**validated_data)
        user.role = 'employee'
        user.save()
        return user


# -------------------- Leave Request Serializer --------------------
class LeaveRequestSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = LeaveRequest
        fields = '__all__'
        read_only_fields = ['employee', 'created_at']

    def update(self, instance, validated_data):
        status = validated_data.get('status')
        if status not in ['approved', 'rejected']:
            raise serializers.ValidationError("Status must be either 'approved' or 'rejected'.")
        instance.status = status
        instance.save()
        return instance


# -------------------- Attendance Serializer --------------------
class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField()
    employee_email = serializers.SerializerMethodField()
    employee_phone = serializers.SerializerMethodField()
    employee_department = serializers.SerializerMethodField()

    class Meta:
        model = Attendance
        fields = ['id', 'employee_name', 'employee_email', 'employee_phone', 'employee_department', 'status', 'date']

    def get_employee_name(self, obj):
        return getattr(obj.employee.employee_profile, 'name', obj.employee.username)

    def get_employee_email(self, obj):
        return getattr(obj.employee.employee_profile, 'email', obj.employee.email)

    def get_employee_phone(self, obj):
        return getattr(obj.employee.employee_profile, 'phone', obj.employee.phone or 'N/A')

    def get_employee_department(self, obj):
        return getattr(obj.employee.employee_profile, 'department', obj.employee.department or 'N/A')


# -------------------- Project Serializer --------------------
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


# -------------------- Task Serializer --------------------
class TaskSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['id']


# -------------------- Employee Task Serializer --------------------
class EmployeeTaskSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.username')
    project_name = serializers.ReadOnlyField(source='project.name')

    class Meta:
        model = EmployeeTask
        fields = '__all__'


# -------------------- Task Update Serializer --------------------
class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskUpdate
        fields = '__all__'



class ProjectCommentSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='update.employee.name', read_only=True)
    sender_name = serializers.CharField(source='sender.name', read_only=True)

    class Meta:
        model = ProjectComment
        fields = '__all__'




class ProjectUpdateSerializer(serializers.ModelSerializer):
    comments = ProjectCommentSerializer(many=True, read_only=True)
    employee_name = serializers.CharField(source='employee.name', read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    text = serializers.CharField(source='update_text', read_only=True)  

    class Meta:
        model = ProjectUpdate
        fields = '__all__'



class ProjectUpdateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUpdate
        fields = ['project', 'update_text']
