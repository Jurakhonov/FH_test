from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, BranchViewSet, HallViewSet, EventViewSet, SessionViewSet,
    reserve_tickets, pay_mock
)

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('branches', BranchViewSet, basename='branches')
router.register('halls', HallViewSet, basename='halls')
router.register('events', EventViewSet, basename='events')
router.register('sessions', SessionViewSet, basename='sessions')

urlpatterns = [
    path('', include(router.urls)),
    path('reserve/', reserve_tickets, name='reserve'),
    path('pay/', pay_mock, name='pay_mock'),
]
