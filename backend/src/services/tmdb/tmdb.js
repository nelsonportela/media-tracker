// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { TmdbService, getOptions } from './tmdb.class.js'
import { tmdbPath, tmdbMethods } from './tmdb.shared.js'

export * from './tmdb.class.js'

// A configure function that registers the service and its hooks via `app.configure`
export const tmdb = (app) => {
  // Register our service on the Feathers application
  app.use(tmdbPath, new TmdbService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tmdbMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tmdbPath).hooks({
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
