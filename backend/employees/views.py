from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by('-created_at')
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.AllowAny]  

def home(request):
    return HttpResponse("Welcome to the Employee Management System API")
