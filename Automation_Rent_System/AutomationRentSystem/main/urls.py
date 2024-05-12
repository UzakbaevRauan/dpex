from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('transport_list/', views.transport_list, name='transport_list'),
    path('transport_list/<int:transport_id>/', views.transport_detail, name='transport_detail'),
    path('add/', views.add_ad, name='add_transport'),
    path('api/models/<int:brand_id>/', views.get_models_by_brand, name='get_models_by_brand'),
]
