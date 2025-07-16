
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    EmployeeViewSet,
    SalarySlipViewSet,
    LeaveRequestViewSet,
    AttendanceViewSet,
    current_user_view,
    home,
    RegisterView,
    export_employees_csv,
    TaskViewSet,
    EmployeeTaskViewSet,
    ProjectViewSet,
    TaskUpdateViewSet,
    ProjectUpdateViewSet,
    ProjectCommentViewSet,
    get_my_projects,
    my_tasks
)

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'salary-slips', SalarySlipViewSet, basename='salaryslip')
router.register(r'leave-requests', LeaveRequestViewSet, basename='leaverequest')
router.register(r'attendance', AttendanceViewSet, basename='attendance')
router.register(r'projects', ProjectViewSet)
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'employeetasks', EmployeeTaskViewSet)
router.register(r'task-updates', TaskUpdateViewSet)
router.register(r'project-updates', ProjectUpdateViewSet, basename='projectupdate')
router.register(r'project-comments', ProjectCommentViewSet)

urlpatterns = [
    path('', home, name='api-home'),
    path('me/', current_user_view, name='current-user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
    path('export-employees/', export_employees_csv, name='export-employees'),
    path('my-tasks/', my_tasks, name='my-tasks'),
    path('my-projects/', get_my_projects, name='my-projects'),
    path('check-user-exists/<str:username>/', views.check_user_exists, name='check-user-exists'),
]
