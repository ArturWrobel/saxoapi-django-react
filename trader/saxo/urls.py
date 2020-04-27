from django.urls import path
from . import views
from saxo.views import get_data, ChartData, Portfolio,  get_sp500, get_yahoo_data #YahooData,
from django.views.generic import TemplateView

urlpatterns = [
    #path('', views.index),
    path('', TemplateView.as_view(template_name = 'index.html')),
    path('api/d/', get_data, name='api-data'),
    path('api/chart/data/<int:cross>/<int:horiz>/', ChartData.as_view()),
    path('api/sp500/', get_sp500),
    path('api/yahoo/<stock>/<int:exp>/', get_yahoo_data),
    #path('api/yahoo/<stock>/', YahooData.as_view())
    path('api/portfolio/', Portfolio.as_view()),  
]