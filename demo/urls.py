from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('collab/<int:pk>', views.CollabView.as_view(), name='collab'),
]
