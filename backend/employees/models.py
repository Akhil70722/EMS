# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.utils import timezone
# from django.conf import settings
# from django.contrib.auth import get_user_model


# # Custom user model with role field
# class CustomUser(AbstractUser):
#     ROLE_CHOICES = (
#         ('admin', 'Admin'),
#         ('employee', 'Employee'),
#     )
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
#     name = models.CharField(max_length=100, blank=True, null=True)
#     phone = models.CharField(max_length=15, blank=True, null=True)
#     department = models.CharField(max_length=100, blank=True, null=True)

#     def __str__(self):
#         return f"{self.name or self.username} ({self.role})"

# # Employee model linked to a user
# class Employee(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='employee_profile')
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     phone = models.CharField(max_length=15)
#     department = models.CharField(max_length=100)
#     designation = models.CharField(max_length=50)
#     salary = models.DecimalField(max_digits=10, decimal_places=2)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.name

# class LeaveRequest(models.Model):
#     LEAVE_TYPE_CHOICES = [
#         ('sick', 'Sick Leave'),
#         ('casual', 'Casual Leave'),
#         ('special', 'Special Leave'),
#     ]

#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('rejected', 'Rejected'),
#     ]

#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leave_requests')
#     leave_type = models.CharField(max_length=10, choices=LEAVE_TYPE_CHOICES)
#     reason = models.TextField()
#     start_date = models.DateField()
#     end_date = models.DateField()
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.employee.name} - {self.leave_type} ({self.status})"

# class SalarySlip(models.Model):
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='salary_slips')
#     base_salary = models.DecimalField(max_digits=10, decimal_places=2)
#     hra = models.DecimalField(max_digits=10, decimal_places=2)
#     da = models.DecimalField(max_digits=10, decimal_places=2)
#     bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)

#     # Deductions
#     tax = models.DecimalField(max_digits=10, decimal_places=2, default=200)
#     gratuity = models.DecimalField(max_digits=10, decimal_places=2)
#     provident_fund = models.DecimalField(max_digits=10, decimal_places=2)
    
#     final_salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
#     created_at = models.DateTimeField(default=timezone.now)

#     def save(self, *args, **kwargs):
#         # Automatically calculate final salary and gratuity
#         self.gratuity = 0.1 * float(self.base_salary)
#         self.final_salary = (
#             float(self.base_salary) + float(self.hra) + float(self.da) + float(self.bonus)
#             - float(self.tax) - float(self.gratuity) - float(self.provident_fund)
#         )
#         super(SalarySlip, self).save(*args, **kwargs)

#     def __str__(self):
#         return f"SalarySlip - {self.employee.name} ({self.created_at.date()})"


# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('Present', 'Present'),
#         ('Absent', 'Absent'),
#     ]

#     employee = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name='attendance_records'
#     )
#     date = models.DateField(auto_now_add=True)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)

#     class Meta:
#         unique_together = ('employee', 'date')
#         ordering = ['-date']
#         verbose_name = 'Attendance Record'
#         verbose_name_plural = 'Attendance Records'

#     def __str__(self):
#         return f"{self.employee.get_full_name() or self.employee.username} - {self.date} - {self.status}"

# #new task assigned 
# # from django.db import models
# # from django.contrib.auth import get_user_model

# # User = get_user_model()

# # class Project(models.Model):
# #     name = models.CharField(max_length=100)

# #     def __str__(self):
# #         return self.name

# User = get_user_model()

# #project 
# class Project(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True, null=True)
#     start_date = models.DateField(null=True, blank=True)
#     end_date = models.DateField(null=True, blank=True)

#     def __str__(self):
#         return self.name

# # class Task(models.Model):
# #     title = models.CharField(max_length=100)
# #     description = models.TextField(max_length=500)
# #     project = models.ForeignKey(Project, on_delete=models.CASCADE)
# #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='tasks')
# #     due_date = models.DateField(null=True, blank=True)

# #     def __str__(self):
# #         return self.title

# class Task(models.Model):
#     STATUS_CHOICES = [
#         ('Pending', 'Pending'),
#         ('In Progress', 'In Progress'),
#         ('Completed', 'Completed'),
#     ]

#     #title = models.CharField(max_length=100)
#     description = models.TextField(max_length=500)
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='tasks')
#     due_date = models.DateField(null=True, blank=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')  # ✅ ADDED

#     def __str__(self):
#         return self.title

# class EmployeeTask(models.Model):
#     employee = models.ForeignKey(User, on_delete=models.CASCADE)
#     task = models.ForeignKey(Task, on_delete=models.CASCADE)
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)
#     description = models.TextField(max_length=500)
#     marked_attendance = models.BooleanField(default=False)
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     admin_comment = models.TextField(blank=True, null=True)     
    


# class TaskUpdate(models.Model):
#     task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='updates')
#     sender = models.ForeignKey(User, on_delete=models.CASCADE)  # Either admin or employee
#     message = models.TextField(max_length=500)
#     timestamp = models.DateTimeField(auto_now_add=True)
#     is_admin = models.BooleanField(default=False)

#     def __str__(self):
#         return f"{'Admin' if self.is_admin else 'Employee'} update on {self.task.title}"

    
# class ProjectUpdate(models.Model):
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     date = models.DateField(auto_now_add=True)
#     update_text = models.TextField(max_length=500)

#     def __str__(self):
#         return f"{self.employee.name} - {self.project.name} ({self.date})" 
    
# class ProjectComment(models.Model):
#     update = models.ForeignKey(ProjectUpdate, related_name='comments', on_delete=models.CASCADE)
#     sender = models.ForeignKey(User, on_delete=models.CASCADE)  # admin or employee
#     comment = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.sender.email} - {self.timestamp}"       
    
    
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import get_user_model

# Custom user model with role field
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='employee')
    name = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.name or self.username} ({self.role})"

# Employee model linked to a user
class Employee(models.Model):
    DESIGNATION_CHOICES = [
        ('Python Developer', 'Python Developer'),
        ('Data Scientist', 'Data Scientist'),
        ('Sr. Data Scientist', 'Sr. Data Scientist'),
        ('Team Lead', 'Team Lead'),
        ('Full Stack Developer', 'Full Stack Developer'),
    ]
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='employee_profile')
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=50, choices=DESIGNATION_CHOICES)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = [
        ('sick', 'Sick Leave'),
        ('casual', 'Casual Leave'),
        ('special', 'Special Leave'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPE_CHOICES)
    reason = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.name} - {self.leave_type} ({self.status})"

class SalarySlip(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='salary_slips')
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    hra = models.DecimalField(max_digits=10, decimal_places=2)
    da = models.DecimalField(max_digits=10, decimal_places=2)
    bonus = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Deductions
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=200)
    gratuity = models.DecimalField(max_digits=10, decimal_places=2)
    provident_fund = models.DecimalField(max_digits=10, decimal_places=2)

    final_salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.gratuity = 0.1 * float(self.base_salary)
        self.final_salary = (
            float(self.base_salary) + float(self.hra) + float(self.da) + float(self.bonus)
            - float(self.tax) - float(self.gratuity) - float(self.provident_fund)
        )
        super(SalarySlip, self).save(*args, **kwargs)

    def __str__(self):
        return f"SalarySlip - {self.employee.name} ({self.created_at.date()})"

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ]

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='attendance_records'
    )
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('employee', 'date')
        ordering = ['-date']
        verbose_name = 'Attendance Record'
        verbose_name_plural = 'Attendance Records'

    def __str__(self):
        return f"{self.employee.get_full_name() or self.employee.username} - {self.date} - {self.status}"

# Project model
# class Project(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField(blank=True, null=True)
#     start_date = models.DateField(null=True, blank=True)
#     end_date = models.DateField(null=True, blank=True)

#     def __str__(self):
#         return self.name
class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="assigned_projects", null=True, blank=True)  # ✅ ADD THIS

    def __str__(self):
        return self.name


# Task model
class Task(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    description = models.TextField(max_length=500)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='tasks')
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"{self.project.name} - {self.employee.name}"

class EmployeeTask(models.Model):
    employee = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.TextField(max_length=500)
    marked_attendance = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    admin_comment = models.TextField(blank=True, null=True)

class TaskUpdate(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='updates')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField(max_length=500)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{'Admin' if self.is_admin else 'Employee'} update on {self.task}"

class ProjectUpdate(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    update_text = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.employee.name} - {self.project.name} ({self.date})"

class ProjectComment(models.Model):
    update = models.ForeignKey(ProjectUpdate, related_name='comments', on_delete=models.CASCADE)
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    comment = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.email} - {self.timestamp}"
    