import { KnexService } from '@feathersjs/knex'
import { DateTime } from 'luxon';
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.

export class BookService extends KnexService {
  async remove(id, params) {
    // Set the deletedAt field to the current date-time
    const data = { deletedAt: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') }
    return this.patch(id, data, params)
  }
}

export const getOptions = (app) => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'books'
  }
}
