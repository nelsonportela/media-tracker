import axios from 'axios';

export class GoogleBooksService {
  constructor(options) {
    this.options = options
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
      // Make the API request to the Google Books API
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: `intitle:${title}`,
          startIndex,
          maxResults,
          orderBy
        }
      });
      return data;
    } catch (error) {
      // Handle any errors
      return { error: 'Error fetching data from Google Books API', details: error.message };
    }
  }

  async get(id, _params) {
    try {
      // Make the API request to the Google Books API
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error('Failed to fetch book');
    }
  }
}

export const getOptions = (app) => {
  return { app }
}
