const ADD_BOOK = 'book-search/library/ADD_BOOK';
const REMOVE_BOOK = 'book-search/library/REMOVE_BOOK';

const initialState = [];
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return action.title;
    case REMOVE_BOOK:
      return state.filter((id) => id !== action.title);
    default:
      return state;
  }
}

export function addBook(title) {
  return {
    type: ADD_BOOK,
    title,
  };
}

export function removeBook(title) {
  return {
    type: REMOVE_BOOK,
    title,
  };
}
