import { book } from './books/books.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(book)

  app.configure(user)

  // All services will be registered here
}
