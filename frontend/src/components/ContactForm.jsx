import React, { useState } from 'react';
import ContactList from './ContactList';
import axiosInstance from '../axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ContactForm = () => {
  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  const [editingContact, setEditingContact] = useState(null);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        // Update an existing contact
        await axiosInstance.put(`/contacts/${editingContact.id}/`, contact);
        alert('Contact updated successfully!');
      } else {
        // Create a new contact
        await axiosInstance.post('/contacts/', contact);
        alert('Contact added successfully!');
      }
      setContact({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
      });
      setEditingContact(null);
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact.');
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setContact(contact);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Contact List */}
        <div className="col-md-4">
          <ContactList onEdit={handleEdit} />
        </div>

        {/* Right Column: Contact Form */}
        <div className="col-md-8">
          <h2>{editingContact ? 'Edit Contact' : 'Add Contact'}</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                placeholder="First Name"
                value={contact.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                placeholder="Last Name"
                value={contact.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={contact.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className="form-control"
                placeholder="Phone Number"
                value={contact.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;