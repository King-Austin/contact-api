from django.test import TestCase
from .models import Contact

class ContactModelTest(TestCase):

    def setUp(self):
        self.contact = Contact.objects.create(
            name="John Doe",
            email="john.doe@example.com",
            phone="1234567890"
        )

    def test_contact_creation(self):
        self.assertEqual(self.contact.name, "John Doe")
        self.assertEqual(self.contact.email, "john.doe@example.com")
        self.assertEqual(self.contact.phone, "1234567890")

    def test_contact_str(self):
        self.assertEqual(str(self.contact), "John Doe")