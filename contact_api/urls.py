
from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from contacts.views import ContactViewSet, UserRegistrationView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path ('admin/', admin.site.urls),  # Admin site URL
    path('', include(router.urls)),  # Include the router-generated URLs
    path('api/register/', UserRegistrationView.as_view(), name='user_register'),  # User registration endpoint
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
] 
