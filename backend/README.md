# Booking Backend (Django)

This is a minimal Django backend that models events/sessions/seats and a mock
payment flow that simulates Payme.

Requirements

- Python 3.10+
- Install dependencies: pip install -r requirements.txt

Quick start (Windows PowerShell):

```powershell
cd "c:\Users\HP\Desktop\тест вок\booking_project\backend"
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional, to access admin
python manage.py runserver 0.0.0.0:8000
```

API endpoints (dev):

- GET /api/categories/
- GET /api/events/
- GET /api/sessions/
- GET /api/sessions/<id>/seats/ (returns seat grid and reserved flags)
- POST /api/reserve/ (reserve seats and create Payment) payload: {"session_id":
  1, "seats": [1,2,3], "user_id": null}
- POST /api/pay/ (mock pay endpoint) payload: {"payment_id": 1, "action":
  "success"}

Notes

- This is intentionally minimal and uses a mock payment endpoint. Replace with
  real Payme integration for production.
- The seat "seats" field on Payment stores a JSON string of seat ids for
  simplicity.
