import React, { useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import BookList from './BookList';
import View from './View';
import { getBookList } from '../redux/books/books';

const Search = () => {
  const books = useSelector((state) => state, shallowEqual);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');

  const handleChange = (e) => {
    if (books.length !== 0) {
      setTitle('');
    }
    setTitle(e.target.value);
  };

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const getBooks = (e) => {
    e.preventDefault();
    dispatch(getBookList(e.target.title.value, 0, language));
    // setTitle('');
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
        <select onChange={changeLanguage} name="language">
          <option value="">--Please choose a language--</option>
          <option value="&langRestrict=en">English</option>
          <option value="&langRestrict=pl">Polish</option>
        </select>
        <button type="submit">submit</button>
      </form>
      <div key={books}>
        <View key={title} title={title} language={language} />
      </div>
    </div>
  );
};

export default Search;
