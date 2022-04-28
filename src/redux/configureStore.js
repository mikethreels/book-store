// eslint-disable-next-line camelcase
import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import books from './books/books';

const store = legacy_createStore(
  books,
  applyMiddleware(thunk),
);

window.store = store;

export default store;
