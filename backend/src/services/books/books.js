// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  bookDataValidator,
  bookPatchValidator,
  bookQueryValidator,
  bookResolver,
  bookExternalResolver,
  bookDataResolver,
  bookPatchResolver,
  bookQueryResolver
} from './books.schema.js'
import { BookService, getOptions } from './books.class.js'
import { bookPath, bookMethods } from './books.shared.js'
import { getGoogleBook } from '../../hooks/books-before.hooks.js'

export * from './books.class.js'
export * from './books.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const book = (app) => {
  // Register our service on the Feathers application
  app.use(bookPath, new BookService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: bookMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(bookPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(bookExternalResolver),
        schemaHooks.resolveResult(bookResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(bookQueryValidator), schemaHooks.resolveQuery(bookQueryResolver)],
      find: [],
      get: [],
      create: [getGoogleBook, schemaHooks.validateData(bookDataValidator), schemaHooks.resolveData(bookDataResolver)],
      patch: [schemaHooks.validateData(bookPatchValidator), schemaHooks.resolveData(bookPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}