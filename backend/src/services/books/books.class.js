import { KnexService } from '@feathersjs/knex';
import { DateTime } from 'luxon';

/**
 * Service for interacting with the books table in the database.
 * Extends the standard Knex adapter service methods.
 */
export class BookService extends KnexService {
  /**
   * Soft deletes a book by setting the deletedAt field to the current date-time.
   * @param {string|number} id - The ID of the book to remove.
   * @param {Object} params - Additional parameters for the remove operation.
   * @returns {Promise<Object>} The patched book data with the deletedAt field set.
   */
  async remove(id, params) {
    // Set the deletedAt field to the current date-time
    const data = { deletedAt: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') };
    return this.patch(id, data, params);
  }
}

/**
 * Gets the options for the BookService.
 * @param {Object} app - The application instance.
 * @returns {Object} The options for the service, including pagination, model, and table name.
 */
export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'books'
  };
}