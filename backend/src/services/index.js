import { userItem } from './user_item/user_item.js'
import { googleBooks } from './google_books/google_books.js'
import { book } from './books/books.js'
import { user } from './users/users.js'
export const services = (app) => {
  app.configure(userItem)

  app.configure(googleBooks)

  app.configure(book)

  app.configure(user)

  // All services will be registered here
}
