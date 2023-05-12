from django.contrib import admin
from django.urls import path, include
from rest_framework import routers 
from myapp import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'items', views.ItemView, 'items')
router.register(r'images', views.ImageView, 'images')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/images/item/<itemid>/', views.ImageItemView.as_view()),
    path('api/', include(router.urls)), 
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('__debug__/', include('debug_toolbar.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ultima aggiunta per ottenere le singole immagini