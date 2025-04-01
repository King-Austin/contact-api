from django.contrib import admin
from .models import Contact

# Register the Contact model
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'user', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)