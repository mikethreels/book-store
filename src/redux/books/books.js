export const url = 'https://www.googleapis.com/books/v1/volumes?q=';

const FETCH_BOOKLIST = 'book-search/books/FETCH_BOOKLIST';

const initialState = [];
let bookList = [];
let currTitle = '';
export default function reducer(state = initialState, action, index) {
  if (index === 0) {
    bookList = [];
  }
  switch (action.type) {
    case FETCH_BOOKLIST:
      if (currTitle === '' || currTitle === action.data.title) {
        action.data.items.forEach((key) => {
          bookList.push(key);
        });
      } else {
        bookList = [];
        action.data.items.forEach((key) => {
          bookList.push(key);
        });
      }
      // console.log(bookList);
      currTitle = action.data.title;
      return bookList;
    default:
      return state;
  }
}

export function getBookList(title, index, lang) {
  return async (dispatch) => {
    await fetch(`${url}${title}${lang}&startIndex=${index}&maxResults=15&key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line no-param-reassign
        data.title = title;
        dispatch({
          type: FETCH_BOOKLIST, data, index,
        });
      });
  };
}
