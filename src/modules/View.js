import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import PropTypes from 'prop-types';
import { getBookList } from '../redux/books/books';
import { addBook, removeBook } from '../redux/library/library';
import viewStyles from '../styles/View.module.css';

const View = ({ title, language }) => {
  // const { title, language } = props;
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const library = useSelector((state) => state.library);
  const [status, setStatus] = useState('Search a book');

  const checkBook = (tag) => {
    if (library === null) {
      return viewStyles.not_owned;
    }
    if (library.includes(tag)) {
      return viewStyles.book_owned;
    }
    return viewStyles.not_owned;
  };

  const sendBook = (e = '') => {
    if (JSON.parse(localStorage.getItem('books')) !== null && e !== '') {
      const tag = JSON.parse(localStorage.getItem('books'));
      tag.push(e.target.value);
      localStorage.setItem('books', JSON.stringify(tag));
    } else if (JSON.parse(localStorage.getItem('books')) !== null && e === '') {
      dispatch(addBook(JSON.parse(localStorage.getItem('books'))));
    } else if (JSON.parse(localStorage.getItem('books')) === null && e !== '') {
      const arr = [];
      arr.push(e.target.value);
      localStorage.setItem('books', JSON.stringify(arr));
    }
    dispatch(addBook(JSON.parse(localStorage.getItem('books'))));
  };

  const deleteBook = (e) => {
    const tag = JSON.parse(localStorage.getItem('books'));
    localStorage.setItem('books', JSON.stringify(tag.filter((id) => id !== e.target.value)));
    dispatch(removeBook(e.target.value));
  };

  useEffect(() => {
    if (books.length === 0) {
      setStatus('Search a book');
    } else {
      setStatus('Loading...');
    }
    sendBook();
    if (library !== null) {
      checkBook();
    }
  }, [books]);

  const getPage = async () => {
    const index = books.length - 1;
    // console.log(`lang = ${language}`);
    await dispatch(getBookList(title, index, language));
    if (status === 'loading...') {
      await setStatus('loaded');
    } else {
      await setStatus('loading...');
    }
  };

  const checkImage = (info) => {
    if (info.imageLinks === undefined) {
      return 'http://books.google.com/books/content?id=DisREAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api';
    }
    return info.imageLinks.thumbnail;
  };

  const checkDescrLength = (description) => {
    if (description === undefined) {
      return description;
    }
    return `${description.substring(0, 200)}...`;
  };

  return (
    <InfiniteScroll
      dataLength={books.length} // This is important field to render the next data
      next={getPage}
      hasMore
      loader={<h4>{status}</h4>}
      endMessage={(
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
)}
    >
      <div className={viewStyles.bookContainer}>
        {books.map((book) => {
          const { volumeInfo } = book;
          const {
            title, publishedDate, description,
          } = volumeInfo;
          return (
            <div key={book.etag} className={viewStyles.bookCard}>
              <div key={book.etag} className={checkBook(book.id)}>
                <p>{book.volumeInfo.title}</p>
                <p>{publishedDate}</p>
                <p className={viewStyles.descParagraph}>{checkDescrLength(description)}</p>
                <img className={viewStyles.image} src={checkImage(volumeInfo)} alt={title} />
                <button type="submit" onClick={sendBook} value={book.id}>Add book to library</button>
                <button type="submit" onClick={deleteBook} value={book.id}>Remove book from library</button>
              </div>
            </div>
          );
        })}
      </div>
    </InfiniteScroll>

  );
};

View.propTypes = {
  title: PropTypes.string,
  language: PropTypes.string,
};

View.defaultProps = {
  title: '',
  language: '',
};
export default View;
