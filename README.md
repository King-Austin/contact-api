# Contact API

This is a Django project for a simple contact management API. It allows users to create, read, update, and delete contact information.

## Project Structure

```
contact-api
├── contact_api
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── contacts
│   ├── migrations
│   │   └── __init__.py
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   └── views.py
├── manage.py
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd contact-api
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install django
   ```

4. **Run migrations:**
   ```
   python manage.py migrate
   ```

5. **Run the development server:**
   ```
   python manage.py runserver
   ```

## Usage

You can interact with the API using tools like Postman or curl. The API supports the following endpoints:

- `GET /contacts/` - List all contacts
- `POST /contacts/` - Create a new contact
- `GET /contacts/{id}/` - Retrieve a specific contact
- `PUT /contacts/{id}/` - Update a specific contact
- `DELETE /contacts/{id}/` - Delete a specific contact

## License

This project is licensed under the MIT License.