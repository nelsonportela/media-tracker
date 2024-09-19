import axios from 'axios';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Service for interacting with the Google Books API.
 */
export class GoogleBooksService {

  /**
   * Creates an instance of GoogleBooksService.
   *
   * @param {object} options - Configuration options for the service.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Searches for books by title using the Google Books API.
   *
   * @param {object} context - The context object containing the query parameters.
   * @param {object} context.query - The query parameters.
   * @param {string} context.query.title - The title of the book to search for.
   * @param {number} [context.query.startIndex=0] - The index of the first result to return.
   * @param {number} [context.query.maxResults=10] - The maximum number of results to return.
   * @param {string} [context.query.orderBy='relevance'] - The order in which to return results.
   * @param {object} _params - Additional parameters.
   * @returns {Promise<object>} The search results from the Google Books API.
   */
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

  /**
   * Retrieves a book by its ID using the Google Books API.
   *
   * @param {string} id - The ID of the book to retrieve.
   * @param {object} _params - Additional parameters.
   * @returns {Promise<object>} The book details from the Google Books API.
   * @throws {Error} If the book ID is not provided.
   */
  async get(id, _params) {
    if (!id) {
      throw new Error('Book ID is required');
    }

    try {
      const response = await axios.get(`${GOOGLE_BOOKS_API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Google Books API:', error);
      return { error: 'Error fetching data from Google Books API', details: error.message };
    }
  }
}

export const getOptions = (app) => {
  return { app };
}