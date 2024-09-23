// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { hooks as schemaHooks } from '@feathersjs/schema'
// Import feathers-knex hooks
import { transaction } from '@feathersjs/knex'
import {
  seriesDataValidator,
  seriesPatchValidator,
  seriesQueryValidator,
  seriesResolver,
  seriesExternalResolver,
  seriesDataResolver,
  seriesPatchResolver,
  seriesQueryResolver
} from './series.schema.js'
import { SeriesService, getOptions } from './series.class.js'
import { seriesPath, seriesMethods } from './series.shared.js'
import { getTmdbSeries, createSeasons, setUserItem } from '../../hooks/series.hooks.js'

export * from './series.class.js'
export * from './series.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const series = (app) => {
  // Register our service on the Feathers application
  app.use(seriesPath, new SeriesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: seriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(seriesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(seriesExternalResolver),
        schemaHooks.resolveResult(seriesResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(seriesQueryValidator), schemaHooks.resolveQuery(seriesQueryResolver)],
      find: [],
      get: [],
      create: [
        transaction.start(),
        getTmdbSeries, 
        schemaHooks.validateData(seriesDataValidator),
        schemaHooks.resolveData(seriesDataResolver)
      ],
      patch: [schemaHooks.validateData(seriesPatchValidator), schemaHooks.resolveData(seriesPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: [createSeasons, setUserItem,transaction.end()]
    },
    error: {
      all: [],
      create: [transaction.rollback()]
    }
  })
}
