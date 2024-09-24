// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  episodesDataValidator,
  episodesPatchValidator,
  episodesQueryValidator,
  episodesResolver,
  episodesExternalResolver,
  episodesDataResolver,
  episodesPatchResolver,
  episodesQueryResolver
} from './episodes.schema.js'
import { EpisodesService, getOptions } from './episodes.class.js'
import { episodesPath, episodesMethods } from './episodes.shared.js'
import { setUserItem } from '../../hooks/series.hooks.js'


export * from './episodes.class.js'
export * from './episodes.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const episodes = (app) => {
  // Register our service on the Feathers application
  app.use(episodesPath, new EpisodesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: episodesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(episodesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(episodesExternalResolver),
        schemaHooks.resolveResult(episodesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(episodesQueryValidator),
        schemaHooks.resolveQuery(episodesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(episodesDataValidator),
        schemaHooks.resolveData(episodesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(episodesPatchValidator),
        schemaHooks.resolveData(episodesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: [],
      create: [setUserItem(5)]
    },
    error: {
      all: []
    }
  })
}
