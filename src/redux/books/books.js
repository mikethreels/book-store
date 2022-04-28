export const url = 'https://www.googleapis.com/books/v1/volumes?q=';

const FETCH_BOOKLIST = 'book-search/books/FETCH_BOOKLIST';

const initialState = [];
export default function reducer(state = initialState, action) {
  const bookList = [];
  switch (action.type) {
    case FETCH_BOOKLIST:
      // console.log(action.data);
      action.data.items.forEach((key) => {
        bookList.push(key);
      });
      return bookList;
    default:
      return state;
  }
}

export function getBookList(title) {
  return async (dispatch) => {
    await fetch(`${url}${title}&key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: FETCH_BOOKLIST, data });
      });
  };
}
