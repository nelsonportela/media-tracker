import axios from 'axios';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Service for interacting with the Google Books API.
 */
export class GoogleBooksService {
  /**
   * Creates an instance of GoogleBooksService.
   * @param {Object} options - Configuration options for the service.
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Finds books based on the provided query.
   * @param {Object} context - The context containing the query.
   * @param {Object} _params - Additional parameters (unused).
   * @returns {Promise<Object>} The search results or an error message.
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
   * Gets a book by its ID.
   * @param {string} id - The ID of the book.
   * @param {Object} _params - Additional parameters (unused).
   * @returns {Promise<Object>} The book data or an error message.
   */
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

/**
 * Gets the options for the GoogleBooksService.
 * @param {Object} app - The application instance.
 * @returns {Object} The options for the service.
 */
export const getOptions = (app) => {
  return { app };
}