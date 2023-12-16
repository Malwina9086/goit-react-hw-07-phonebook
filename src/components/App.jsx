import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { Counter } from './Counter/counter';
import Filter from './Filter/Filter';

const App = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <Counter />
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export { App };
