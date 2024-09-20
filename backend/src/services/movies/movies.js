// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
// Import feathers-knex hooks
import { transaction } from '@feathersjs/knex'
import {
  moviesDataValidator,
  moviesPatchValidator,
  moviesQueryValidator,
  moviesResolver,
  moviesExternalResolver,
  moviesDataResolver,
  moviesPatchResolver,
  moviesQueryResolver
} from './movies.schema.js'
import { MoviesService, getOptions } from './movies.class.js'
import { moviesPath, moviesMethods } from './movies.shared.js'
import { getTmdbMovie, setUserItem } from '../../hooks/movies.hooks.js'

export * from './movies.class.js'
export * from './movies.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const movies = (app) => {
  // Register our service on the Feathers application
  app.use(moviesPath, new MoviesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: moviesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(moviesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(moviesExternalResolver),
        schemaHooks.resolveResult(moviesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(moviesQueryValidator), schemaHooks.resolveQuery(moviesQueryResolver)],
      find: [],
      get: [],
      create: [
        transaction.start(),
        getTmdbMovie, 
        schemaHooks.validateData(moviesDataValidator), 
        schemaHooks.resolveData(moviesDataResolver)
      ],
      patch: [schemaHooks.validateData(moviesPatchValidator), schemaHooks.resolveData(moviesPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [setUserItem,transaction.end()]
    },
    error: {
      all: [],
      create: [transaction.rollback()]
    }
  })
}
