// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
// Import feathers-knex hooks
import { transaction } from '@feathersjs/knex'
import {
  seasonsDataValidator,
  seasonsPatchValidator,
  seasonsQueryValidator,
  seasonsResolver,
  seasonsExternalResolver,
  seasonsDataResolver,
  seasonsPatchResolver,
  seasonsQueryResolver
} from './seasons.schema.js'
import { SeasonsService, getOptions } from './seasons.class.js'
import { seasonsPath, seasonsMethods } from './seasons.shared.js'
import { getTmdbSeason, setUserItem } from '../../hooks/series.hooks.js'

export * from './seasons.class.js'
export * from './seasons.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const seasons = (app) => {
  // Register our service on the Feathers application
  app.use(seasonsPath, new SeasonsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: seasonsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(seasonsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(seasonsExternalResolver),
        schemaHooks.resolveResult(seasonsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(seasonsQueryValidator), schemaHooks.resolveQuery(seasonsQueryResolver)],
      find: [],
      get: [],
      create: [
        transaction.start(),
        getTmdbSeason,
        schemaHooks.validateData(seasonsDataValidator), 
        schemaHooks.resolveData(seasonsDataResolver)
      ],
      patch: [schemaHooks.validateData(seasonsPatchValidator), schemaHooks.resolveData(seasonsPatchResolver)],
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
