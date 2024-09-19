// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { GoogleBooksService, getOptions } from './google_books.class.js'
import { googleBooksPath, googleBooksMethods } from './google_books.shared.js'

export * from './google_books.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const googleBooks = (app) => {
  // Register our service on the Feathers application
  app.use(googleBooksPath, new GoogleBooksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: googleBooksMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(googleBooksPath).hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
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
