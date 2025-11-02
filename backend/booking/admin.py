from django.contrib import admin
from .models import Category, Branch, Hall, Event, Session, Seat, Ticket, Payment

admin.site.register(Category)
admin.site.register(Branch)
admin.site.register(Hall)
admin.site.register(Event)
admin.site.register(Session)
admin.site.register(Seat)
admin.site.register(Ticket)
admin.site.register(Payment)
