import axios from 'axios';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export class GoogleBooksService {

  constructor(options) {
    this.options = options;
  }

  async find(context, _params) {
    const { query } = context;

    if (!query || !query.title) {
      return { error: 'Title is required' };
    }

    const {
      title,
      startIndex = 0,
      maxResults = 10,
      orderBy = 'relevance'
    } = query;

    try {
      const { data } = await axios.get(GOOGLE_BOOKS_API_BASE_URL, {
        params: {
          q: `intitle:${title}`,
          startIndex,
          maxResults,
          orderBy
        }
      });
      return data;
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
      return { error: 'Error fetching data from Google Books API', details: error.message };
    }
  }

  async get(id, _params) {
    if (!id) {
      throw new Error('Book ID is required');
    }

    try {
      const response = await axios.get(`${GOOGLE_BOOKS_API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  }
}

export const getOptions = (app) => {
  return { app };
}