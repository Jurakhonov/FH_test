from rest_framework import serializers
from .models import Category, Branch, Hall, Event, Session, Seat, Ticket, Payment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)
    available_seats = serializers.SerializerMethodField()
    is_sold_out = serializers.SerializerMethodField()
    
    class Meta:
        model = Session
        fields = '__all__'
    
    def get_available_seats(self, obj):
        return getattr(obj, 'total_seats', 0) - getattr(obj, 'booked_seats', 0)
    
    def get_is_sold_out(self, obj):
        return getattr(obj, 'booked_seats', 0) >= getattr(obj, 'total_seats', 0)

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
