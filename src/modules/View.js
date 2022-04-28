import React from 'react';
import {
  useSelector,
} from 'react-redux';

const View = () => {
  const books = useSelector((state) => state);

  const renderList = books.map((book) => {
    const { volumeInfo } = book;
    const {
      imageLinks, title, publishedDate, description,
    } = volumeInfo;
    return (
      <div key={book.id} className={book.id}>
        <p>{book.volumeInfo.title}</p>
        <p>{publishedDate}</p>
        <p>{description}</p>
        <img src={imageLinks.thumbnail} alt={title} />
      </div>
    );
  });
  return <>{renderList}</>;
};

export default View;
