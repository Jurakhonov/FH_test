from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Branch(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.name

class Hall(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name='halls')
    name = models.CharField(max_length=100)
    rows = models.PositiveIntegerField(default=5)
    cols = models.PositiveIntegerField(default=8)

    def __str__(self):
        return f"{self.branch.name} - {self.name}"

class Event(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    # dates when event can be attended are modelled via Sessions

    def __str__(self):
        return self.title

class Session(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sessions')
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.event.title} @ {self.start_time}"

class Seat(models.Model):
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='seats')
    row = models.PositiveIntegerField()
    col = models.PositiveIntegerField()
    seat_type = models.CharField(max_length=20, choices=(
        ('econom', 'Econom'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
        ('vip', 'VIP'),
    ), default='standard')

    class Meta:
        unique_together = ('hall', 'row', 'col')

    def __str__(self):
        return f"{self.hall} R{self.row}C{self.col} ({self.seat_type})"

class Ticket(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='tickets')
    seat = models.ForeignKey(Seat, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    reserved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('session', 'seat')

    def __str__(self):
        return f"Ticket {self.session} {self.seat}"

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('success', 'Success'),
        ('failed', 'Failed'),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    session = models.ForeignKey(Session, on_delete=models.SET_NULL, null=True, blank=True)
    seats = models.TextField(blank=True)  # simple JSON-like string storing seats
    external_id = models.CharField(max_length=200, blank=True)  # for Payme txn id

    def __str__(self):
        return f"Payment {self.id} {self.status} {self.amount}"
