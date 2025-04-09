'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get('/contacts/');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  // Handle form submission to add a new contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/contacts/', newContact);
      setContacts([...contacts, response.data]); // Add the new contact to the list
      setNewContact({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
      }); // Reset the form
      alert('Contact added successfully!');
    } catch (error) {
      console.error('Error adding contact:', response.data.message);
      alert('Failed to add contact. Please try again.');
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/contacts/${id}/`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Contacts</h2>

      {/* Form for Adding New Contact */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6">
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newContact.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newContact.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newContact.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newContact.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Contact
        </button>
      </form>

      {/* Contact List */}
      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {contact.first_name} {contact.last_name} - {contact.email}
            </span>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;