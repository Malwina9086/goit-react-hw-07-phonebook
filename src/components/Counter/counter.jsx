import { useSelector } from 'react-redux';
import { selectCount } from '../../redux/contactsSlice';

export const Counter = () => {
  const count = useSelector(selectCount);
  return (
    <div>
      <h3>Number of contacts: {count}</h3>
    </div>
  );
};
