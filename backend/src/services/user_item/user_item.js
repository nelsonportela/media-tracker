// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'
import { restrictToOwner } from '../../hooks/general.hooks.js'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  userItemDataValidator,
  userItemPatchValidator,
  userItemQueryValidator,
  userItemResolver,
  userItemExternalResolver,
  userItemDataResolver,
  userItemPatchResolver,
  userItemQueryResolver
} from './user_item.schema.js'
import { UserItemService, getOptions } from './user_item.class.js'
import { userItemPath, userItemMethods } from './user_item.shared.js'
import { softDelete, disallow } from 'feathers-hooks-common';
import { DateTime } from 'luxon';

export * from './user_item.class.js'
export * from './user_item.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const userItem = (app) => {
  // Register our service on the Feathers application
  app.use(userItemPath, new UserItemService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userItemMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userItemPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(userItemExternalResolver),
        schemaHooks.resolveResult(userItemResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userItemQueryValidator),
        schemaHooks.resolveQuery(userItemQueryResolver),
        softDelete({
          deletedQuery: async context => {
            return { deleted_at: null };
          },
          removeData: async context => {
            return { deleted_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss') };
          }
        })
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userItemDataValidator),
        schemaHooks.resolveData(userItemDataResolver)
      ],
      patch: [
        restrictToOwner,
        schemaHooks.validateData(userItemPatchValidator),
        schemaHooks.resolveData(userItemPatchResolver)
      ],
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
