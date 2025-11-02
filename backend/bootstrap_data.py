"""Run this script to create sample data quickly.
Usage (PowerShell):

$env:DJANGO_SETTINGS_MODULE='backend.settings'; python .\bootstrap_data.py

Or activate the venv and run with the same env var.
"""
import os
import django

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()
    from booking.models import Category, Branch, Hall, Event, Session, Seat
    from django.utils import timezone
    from datetime import timedelta

    # create categories
    cat1, _ = Category.objects.get_or_create(name='Movies')
    cat2, _ = Category.objects.get_or_create(name='Concerts')

    branch, _ = Branch.objects.get_or_create(name='Central Cinema', address='Main St 1')
    # create multiple halls with different sizes to allow sessions with different seat counts
    hall1, _ = Hall.objects.get_or_create(branch=branch, name='Hall 1', rows=6, cols=8)
    hall2, _ = Hall.objects.get_or_create(branch=branch, name='Hall 2', rows=8, cols=10)
    hall3, _ = Hall.objects.get_or_create(branch=branch, name='Hall 3', rows=4, cols=6)

    # helper to (re)create seats for a hall
    def create_seats_for_hall(hall_obj):
        Seat.objects.filter(hall=hall_obj).delete()
        for r in range(1, hall_obj.rows + 1):
            for c in range(1, hall_obj.cols + 1):
                stype = 'standard'
                if r <= 2:
                    stype = 'vip'
                elif r <= 3:
                    stype = 'premium'
                elif c % 3 == 0:
                    stype = 'econom'
                Seat.objects.create(hall=hall_obj, row=r, col=c, seat_type=stype)

    # create seats for all halls
    create_seats_for_hall(hall1)
    create_seats_for_hall(hall2)
    create_seats_for_hall(hall3)

    # Create multiple events
    # Events: assign some to different halls so sessions have different seat counts
    events_data = [
        {
            'title': 'Inception 2',
            'category': cat1,
            'price': 12.00,
            'days_range': (1, 7),
            'hall': hall1,
            'times': [10, 14, 18]
        },
        {
            'title': 'The Matrix Reborn',
            'category': cat1,
            'price': 15.00,
            'days_range': (1, 5),
            'hall': hall2,
            'times': [12, 17, 21]
        },
        {
            'title': 'Summer Rock Festival',
            'category': cat2,
            'price': 25.00,
            'days_range': (10, 12),
            'hall': hall2,
            'times': [18, 21]
        },
        {
            'title': 'Avatar 3',
            'category': cat1,
            'price': 18.00,
            'days_range': (1, 8),
            'hall': hall1,
            'times': [11, 15, 19]
        },
        {
            'title': 'Classical Night',
            'category': cat2,
            'price': 30.00,
            'days_range': (5, 6),
            'hall': hall3,
            'times': [19]
        },
        {
            'title': 'Spider-Man: New Generation',
            'category': cat1,
            'price': 14.00,
            'days_range': (2, 6),
            'hall': hall1,
            'times': [13, 17]
        },
        {
            'title': 'Jazz Evening',
            'category': cat2,
            'price': 20.00,
            'days_range': (7, 8),
            'hall': hall3,
            'times': [20]
        }
    ]

    import random

    now = timezone.now()
    
    # Clear existing events and sessions
    Event.objects.all().delete()
    Session.objects.all().delete()

    # Create events and their sessions; each event can specify its hall and times
    for event_data in events_data:
        assigned_hall = event_data.get('hall', hall1)
        event, _ = Event.objects.get_or_create(
            title=event_data['title'],
            category=event_data['category']
        )

        # times may be provided as list of hours
        event_times = event_data.get('times')
        if event_times:
            times = [timedelta(hours=h) for h in event_times]
        else:
            times = [timedelta(hours=10), timedelta(hours=14), timedelta(hours=18), timedelta(hours=21)]

        start_day, end_day = event_data['days_range']
        for day in range(start_day, end_day + 1):
            for time_delta in times:
                base_time = now.replace(hour=0, minute=0, second=0, microsecond=0)
                session_time = base_time + timedelta(days=day) + time_delta

                # Only create future sessions
                if session_time > now:
                    Session.objects.get_or_create(
                        event=event,
                        hall=assigned_hall,
                        start_time=session_time,
                        price=event_data['price']
                    )

    # Create some reserved tickets to simulate already-booked seats across halls
    from booking.models import Ticket
    all_seats = list(Seat.objects.all())
    # pick some upcoming sessions and reserve a random set of seats (across halls)
    sessions = list(Session.objects.filter(start_time__gt=now).order_by('start_time')[:24])
    for sess in sessions:
        # reserve between 3 and up to 25% of seats for that session
        hall_seats = list(Seat.objects.filter(hall=sess.hall))
        if not hall_seats:
            continue
        max_reserve = max(3, int(len(hall_seats) * 0.25))
        count = random.randint(3, min(max_reserve, len(hall_seats)))
        chosen = random.sample(hall_seats, count)
        for seat in chosen:
            try:
                Ticket.objects.create(session=sess, seat=seat)
            except Exception:
                # ignore duplicates or other errors
                pass

    print('Sample data created with multiple halls, events, sessions and reserved seats')

if __name__ == '__main__':
    main()
