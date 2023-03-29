"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers 
from myapp import views
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'tests', views.TestView, 'test')
router.register(r'images', views.ImageView, 'images')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/images/test/<testid>/', views.ImageTestView.as_view()),
    path('api/', include(router.urls)), 
    path('celery/<testid>/', views.test),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ultima aggiunta per ottenere le singole immagini