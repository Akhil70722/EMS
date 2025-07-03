from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet
from django.http import HttpResponse

# Router to automatically handle /employees/ endpoints
router = DefaultRouter()
router.register(r'employees', EmployeeViewSet, basename='employee')

# API welcome message at /api/
def api_home(request):
    return HttpResponse("Welcome to the Employee Management System API")

urlpatterns = [
    path('', api_home),             
    path('', include(router.urls)), 
]
