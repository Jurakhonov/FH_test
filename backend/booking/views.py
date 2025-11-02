from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Category, Branch, Hall, Event, Session, Seat, Ticket, Payment
from .serializers import (
    CategorySerializer, BranchSerializer, HallSerializer,
    EventSerializer, SessionSerializer, SeatSerializer,
    TicketSerializer, PaymentSerializer
)
from django.db import transaction
import json
from django.utils import timezone

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BranchViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class HallViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hall.objects.all()
    serializer_class = HallSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SessionViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SessionSerializer

    def get_queryset(self):
        queryset = Session.objects.filter(active=True)
        # Annotate with available seats count
        from django.db.models import Count, Q
        # Use distinct counts to avoid multiplication caused by joins
        return queryset.annotate(
            total_seats=Count('hall__seats', distinct=True),
            booked_seats=Count('tickets', distinct=True),
        ).order_by('-start_time')

    @action(detail=True, methods=['get'])
    def seats(self, request, pk=None):
        session = get_object_or_404(Session, pk=pk)
        hall = session.hall
        seats = Seat.objects.filter(hall=hall).order_by('row', 'col')
        # find reserved seats for this session
        reserved = set(Ticket.objects.filter(session=session).values_list('seat_id', flat=True))
        data = []
        for s in seats:
            data.append({
                'id': s.id,
                'row': s.row,
                'col': s.col,
                'type': s.seat_type,
                'reserved': s.id in reserved,
            })
        return Response({'seats': data, 'rows': hall.rows, 'cols': hall.cols})

@api_view(['POST'])
def reserve_tickets(request):
    """Reserve seats for a session (creates Tickets) and a Payment object (pending)."""
    data = request.data
    session_id = data.get('session_id')
    seats = data.get('seats')  # list of seat ids
    user_id = data.get('user_id')
    if not session_id or not seats:
        return Response({'detail': 'session_id and seats required'}, status=400)
    session = get_object_or_404(Session, pk=session_id)
    # simple calculation: price * count; could vary by seat type
    amount = session.price * len(seats)
    with transaction.atomic():
        # check availability
        existing = Ticket.objects.filter(session=session, seat_id__in=seats).exists()
        if existing:
            return Response({'detail': 'One or more seats already reserved'}, status=400)
        tickets = []
        for sid in seats:
            seat = get_object_or_404(Seat, pk=sid)
            t = Ticket.objects.create(session=session, seat=seat, user_id=user_id)
            tickets.append(t)
        payment = Payment.objects.create(amount=amount, user_id=user_id, session=session, seats=json.dumps(seats))
    return Response({'payment': PaymentSerializer(payment).data, 'tickets': TicketSerializer(tickets, many=True).data})

@api_view(['POST'])
def pay_mock(request):
    """Mock Payme payment: accept payment_id and simulate success/failure.
    This endpoint simulates an external payment gateway callback.
    """
    payment_id = request.data.get('payment_id')
    action = request.data.get('action', 'success')
    if not payment_id:
        return Response({'detail': 'payment_id required'}, status=400)
    payment = get_object_or_404(Payment, pk=payment_id)
    if action == 'success':
        payment.status = 'success'
        payment.external_id = f"mock-{timezone.now().timestamp()}"
        payment.save()
        return Response({'status': 'success', 'payment': PaymentSerializer(payment).data})
    else:
        payment.status = 'failed'
        payment.save()
        return Response({'status': 'failed', 'payment': PaymentSerializer(payment).data}, status=400)
