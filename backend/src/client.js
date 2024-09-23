// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
export {}

export {}

export {}

export {}

export {}

// Import the necessary clients
import { userClient } from './services/users/users.shared.js'
import { bookClient } from './services/books/books.shared.js'
import { googleBooksClient } from './services/google_books/google_books.shared.js'
import { userItemClient } from './services/user_item/user_item.shared.js'

/**
 * Returns a  client for the backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)

  client.configure(bookClient)

  client.configure(googleBooksClient)

  client.configure(userItemClient)

  client.configure(tmdbClient)

  client.configure(moviesClient)

  client.configure(seriesClient)

  client.configure(seasonsClient)

  return client
}
