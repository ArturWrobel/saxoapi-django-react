from django.urls import path
from . import views
from saxo.views import get_data, ChartData
from django.views.generic import TemplateView

urlpatterns = [
    #path('', views.index),
    path('', TemplateView.as_view(template_name = 'index.html')),
    path('api/d/', get_data, name='api-data'),
    path('api/chart/data/', ChartData.as_view()),  
]