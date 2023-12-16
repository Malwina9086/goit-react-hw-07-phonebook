import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContacts,
  deleteContact,
  selectFilter,
  selectContacts,
} from '../../redux/contactsSlice';

import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.phone
            .replace(/-|\s/g, '')
            .includes(filter.replace(/-|\s/g, ''))
      )
    : [];

  const handleDelete = idToDelete => {
    dispatch(deleteContact(idToDelete));
  };

  return filteredContacts.length > 0 ? (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li className={css.contactItem} key={id}>
          <div className={css.contactDetails}>
            <span className={css.dot}>•</span>
            <span className={css.contactName}>{name}:</span>
          </div>
          <span className={css.contactNumber}>{phone}</span>
          <button
            className={css.deleteButton}
            type="button"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No contacts.</p>
  );
};

export default ContactList;
