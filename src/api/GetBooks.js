const url = 'https://www.googleapis.com/books/v1/volumes?q=';
const getBooks = async (title) => {
  console.log(title);
  const titleUrl = `${url}${title}&key=${process.env.REACT_APP_API_KEY}`;
  const options = {
    method: 'GET',
    mode: 'cors',
  };

  const resp = await fetch(titleUrl, options);
  const response = await resp.json();
  return response.items;
};

export default getBooks;
