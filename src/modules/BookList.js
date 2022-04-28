import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import {
  useSelector,
} from 'react-redux';
import View from './View';
// import getBooks from '../api/GetBooks';
// import Search from './Search';
// import View from './View';

const BookList = () => {
  const books = useSelector((state) => state);
  // while (!books) {
  //   return null;
  // }

  useEffect(() => {
  }, [books]);
  // const [input, setInput] = useState([]);
  // const handleFilterChange = async (e) => {
  //   window.alert(e.target.value);
  //   await setInput(getBooks(e.target.value));
  //   e.preventdefault();
  // };

  return (
    <div>
      <h1>BookList</h1>
      <View />
    </div>
  );
};

// BookList.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   books: PropTypes.object,
// };

// BookList.defaultProps = {
//   books: {},
// };

export default BookList;
