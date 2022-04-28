import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import BookList from './BookList';
import { getBookList } from '../redux/books/books';
// import getBooks from '../api/GetBooks';

const Search = () => {
  const books = useSelector((state) => state.books, shallowEqual);
  const dispatch = useDispatch();
  useEffect(() => {
  }, [books]);
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const getBooks = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    dispatch(getBookList(e.target.title.value));
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={getBooks} action="">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={title}
          required
        />
        <button type="submit">submit</button>
      </form>
      <div key={books}>
        <BookList key={title} />
      </div>
    </div>
  );
};

// Search.propTypes = {
//   callback: PropTypes.func,
// };

// Search.defaultProps = {
//   callback: null,
// };

export default Search;
