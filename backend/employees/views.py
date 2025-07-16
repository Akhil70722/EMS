  
import csv
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import viewsets, permissions, status, serializers
from rest_framework.decorators import api_view, permission_classes ,authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from django.contrib.auth.hashers import make_password
from .models import TaskUpdate
from .serializers import TaskUpdateSerializer , ProjectUpdateSerializer, ProjectCommentSerializer , ProjectUpdateCreateSerializer
from .models import ProjectUpdate, ProjectComment
from rest_framework_simplejwt.authentication import JWTAuthentication
import traceback
from rest_framework.decorators import action


# MODELS & SERIALIZERS
from .models import Employee, SalarySlip, CustomUser, LeaveRequest, Attendance, Task, EmployeeTask, Project

from .serializers import (
    EmployeeSerializer, UserSerializer, SalarySlipSerializer, LeaveRequestSerializer,
    AttendanceSerializer, TaskSerializer, ProjectSerializer, EmployeeTaskSerializer
)
from .permissions import IsAdminOrSelf

User = get_user_model()

#  AUTHENTICATION

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
    })

def home(request):
    return HttpResponse("Welcome to the Employee Management System API")

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        if data.get("password") != data.get("confirm_password"):
            return Response({"error": "Passwords do not match"}, status=HTTP_400_BAD_REQUEST)
        try:
            user = CustomUser.objects.create(
                username=data["username"],
                email=data["email"],
                password=make_password(data["password"]),
                role="employee"
            )
            serializer = UserSerializer(user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_user_exists(request, username):
    from employees.models import CustomUser
    exists = CustomUser.objects.filter(username=username).exists()
    if exists:
        user = CustomUser.objects.get(username=username)
        return Response({'exists': True, 'user_id': user.id})
    return Response({'exists': False})


# EMPLOYEE MANAGEMENT

class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrSelf]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Employee.objects.all().order_by('-created_at')
        return Employee.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        #user = self.request.user
        user = serializer.validated_data.get("user")
        if Employee.objects.filter(user=user).exists():
            raise ValidationError({"detail": "Employee for this user already exists."})
        serializer.save(user=user)

@api_view(['GET'])
def export_employees_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="employee_list.csv"'

    writer = csv.writer(response)
    writer.writerow([
        'ID', 'Username', 'Email', 'Role', 'Name', 'Phone',
        'Department', 'Designation', 'Salary',
        'Is Active', 'Created At', 'Updated At'
    ])

    employees = Employee.objects.select_related('user').all()
    for emp in employees:
        user = emp.user
        writer.writerow([
            emp.id,
            user.username if user else '',
            user.email if user else '',
            user.role if user else '',
            emp.name or '',
            emp.phone or '',
            emp.department or '',
            emp.designation or '',
            emp.salary or 0,
            'Yes' if emp.is_active else 'No',
            emp.created_at.strftime('%Y-%m-%d %H:%M:%S') if emp.created_at else '',
            emp.updated_at.strftime('%Y-%m-%d %H:%M:%S') if emp.updated_at else '',
        ])

    return response

# SALARY SLIPS

class SalarySlipViewSet(viewsets.ModelViewSet):
    serializer_class = SalarySlipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'role') and user.role == 'admin':
            return SalarySlip.objects.all().order_by('-created_at')
        return SalarySlip.objects.filter(employee__user=user).order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'admin':
            employee = serializer.validated_data.get('employee')
            if not employee:
                raise ValidationError({"employee": "This field is required."})
            serializer.save()
        else:
            try:
                employee = Employee.objects.get(user=user)
                serializer.save(employee=employee)
            except Employee.DoesNotExist:
                raise ValidationError({"detail": "Employee profile not found for this user."})

# LEAVE REQUESTS

class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return LeaveRequest.objects.all().order_by('-created_at')
        mine = self.request.query_params.get('mine')
        if mine == 'true' and hasattr(user, 'employee_profile'):
            return LeaveRequest.objects.filter(employee=user.employee_profile).order_by('-created_at')
        return LeaveRequest.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'employee_profile'):
            serializer.save(employee=user.employee_profile)
        else:
            raise ValidationError({"detail": "Employee profile not found for this user."})

    def partial_update(self, request, *args, **kwargs):
        if request.user.role != 'admin':
            return Response({"detail": "Only admin can update leave status."}, status=status.HTTP_403_FORBIDDEN)
        return super().partial_update(request, *args, **kwargs)

    def get_serializer_context(self):
        return {'request': self.request}



# ATTENDANCE

class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Attendance.objects.all().order_by('-date')
        return Attendance.objects.filter(employee=user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_today_attendance(request):
    today = timezone.now().date()
    has_attendance = Attendance.objects.filter(
        employee__user=request.user,
        date=today
    ).exists()
    return Response({'present': has_attendance})



# PROJECT & TASK MGMT

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()  
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Task.objects.all().order_by('-id')
        elif hasattr(user, 'employee_profile'):
            return Task.objects.filter(employee=user.employee_profile).order_by('-id')
        return Task.objects.none()

    def perform_create(self, serializer):
        user = self.request.user
        print("📥 Incoming Task Create Data:", self.request.data)

        if user.role != 'admin':
            raise serializers.ValidationError("Only admins can create tasks.")

        employee = serializer.validated_data.get('employee')
        if not employee:
            raise serializers.ValidationError("Employee must be specified.")

        task_count = Task.objects.filter(employee=employee).count()
        if task_count >= 2:
            raise serializers.ValidationError("❌ Each employee can have at most 2 tasks.")

        serializer.save()


class EmployeeTaskViewSet(viewsets.ModelViewSet):
    queryset = EmployeeTask.objects.all()
    serializer_class = EmployeeTaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return EmployeeTask.objects.all()
        return EmployeeTask.objects.filter(employee=user)

    def perform_create(self, serializer):
        task = serializer.validated_data['task']
        assigned_count = EmployeeTask.objects.filter(task=task).count()
        if assigned_count >= 2:
            raise serializers.ValidationError("❌ Only 2 employees can be assigned to this task.")
        serializer.save(employee=self.request.user)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_tasks(request):
    user = request.user
    if hasattr(user, 'employee_profile'):
        tasks = Task.objects.filter(employee=user.employee_profile)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    return Response([])  # Return empty list if not employee


# PROJECT UPDATES

class TaskUpdateViewSet(viewsets.ModelViewSet):
    queryset = TaskUpdate.objects.all().order_by('-timestamp')
    serializer_class = TaskUpdateSerializer
    permission_classes = [IsAuthenticated]

class ProjectUpdateViewSet(viewsets.ModelViewSet):
    queryset = ProjectUpdate.objects.all().order_by('-date')
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectCommentSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        employee = self.request.query_params.get('employee')
        project = self.request.query_params.get('project')
        date = self.request.query_params.get('date')

        if employee:
            queryset = queryset.filter(employee_id=employee)
        if project:
            queryset = queryset.filter(project_id=project)
        if date:
            queryset = queryset.filter(date=date)
        return queryset

    def perform_create(self, serializer):
        try:
            employee = Employee.objects.get(user=self.request.user)
            serializer.save(employee=employee)
        except Employee.DoesNotExist:
            raise ValidationError({'detail': 'Employee profile not found for this user.'})
    
    @action(detail=False, methods=['get'], url_path='my-updates', permission_classes=[IsAuthenticated])
    def my_updates(self, request):
        try:
            employee = Employee.objects.get(user=request.user)
        except Employee.DoesNotExist:
            return Response({'detail': 'Employee not found.'}, status=404)

        updates = ProjectUpdate.objects.filter(employee=employee).order_by('-date')
        serializer = self.get_serializer(updates, many=True)
        return Response(serializer.data)
    
                
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_project_updates(request):
    user = request.user
    updates = ProjectUpdate.objects.filter(employee=user).order_by('-date')

    # Add select_related if needed for optimization
    serializer = ProjectUpdateSerializer(updates, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_project_updates(request):
    date = request.GET.get('date')
    employee = request.GET.get('employee')
    project = request.GET.get('project')

    updates = ProjectUpdate.objects.all()

    if date:
        updates = updates.filter(date=date)
    if employee:
        updates = updates.filter(employee__name__icontains=employee)
    if project:
        updates = updates.filter(project__name__icontains=project)

    serializer = ProjectUpdateSerializer(updates, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_project_updates(request):
    try:
        user = request.user
        employee = Employee.objects.get(user=user)
        updates = ProjectUpdate.objects.filter(employee=employee).order_by('-date')
        serializer = ProjectUpdateSerializer(updates, many=True)
        return Response(serializer.data)
    except Employee.DoesNotExist:
        return Response({"detail": "Employee not found."}, status=404)


class ProjectCommentViewSet(viewsets.ModelViewSet):
    queryset = ProjectComment.objects.all()
    serializer_class = ProjectCommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'employee':
            return ProjectComment.objects.filter(update__employee=user).select_related('update', 'sender')
        return ProjectComment.objects.all().select_related('update', 'sender')

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)
        
      
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_projects(request):
    try:
        employee = Employee.objects.get(user=request.user)
    except Employee.DoesNotExist:
        return Response({"detail": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)

    task_projects = Task.objects.filter(employee=employee).values_list('project', flat=True).distinct()
    projects = Project.objects.filter(id__in=task_projects)
    
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


class MyProjectsView(APIView):
    def get(self, request):
        try:
            employee = Employee.objects.get(user=request.user)
        except Employee.DoesNotExist:
            return Response({"detail": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        projects = Project.objects.filter(assigned_to=employee)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)    
