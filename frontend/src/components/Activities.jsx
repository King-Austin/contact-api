import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Activities = ({ token }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/contacts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContacts(response.data);
      } catch (error) {
        alert('Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, [token]);

  return (
    <div>
      <h2>Your Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.first_name} {contact.last_name} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;