// eslint-disable-next-line camelcase
import { applyMiddleware, legacy_createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import books from './books/books';
import library from './library/library';

const rootReducer = combineReducers({
  books,
  library,
});

const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunk),
);

window.store = store;

export default store;
