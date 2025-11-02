# Booking Project (Django + React)

This workspace contains a minimal booking system backend (Django) and frontend
(React).

Folders:

- backend: Django REST API
- frontend: React app

Run backend (PowerShell):

```powershell
cd "c:\Users\HP\Desktop\тест вок\booking_project\backend"
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

Run frontend (PowerShell):

```powershell
cd "c:\Users\HP\Desktop\тест вок\booking_project\frontend"
npm install
npm start
```
