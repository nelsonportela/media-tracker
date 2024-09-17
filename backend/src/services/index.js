import { googleBooks } from './google-books/google-books.js'
import { book } from './books/books.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(googleBooks)

  app.configure(book)

  app.configure(user)

  // All services will be registered here
}
