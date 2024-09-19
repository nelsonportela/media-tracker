// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const userItemSchema = {
  $id: 'UserItem',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    id: { type: 'number' },
    user_id: { type: 'number' },
    item_id: { type: 'number' },
    item_type_id: { type: 'number' },
    status_id: { type: 'number' }
  }
}
export const userItemValidator = getValidator(userItemSchema, dataValidator)
export const userItemResolver = resolve({})

export const userItemExternalResolver = resolve({})

// Schema for creating new data
export const userItemDataSchema = {
  $id: 'UserItemData',
  type: 'object',
  additionalProperties: false,
  required: ['status_id'],
  properties: {
    ...userItemSchema.properties
  }
}
export const userItemDataValidator = getValidator(userItemDataSchema, dataValidator)
export const userItemDataResolver = resolve({})

// Schema for updating existing data
export const userItemPatchSchema = {
  $id: 'UserItemPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...userItemSchema.properties,
    deleted_at: {}
  }
}
export const userItemPatchValidator = getValidator(userItemPatchSchema, dataValidator)
export const userItemPatchResolver = resolve({})

// Schema for allowed query properties
export const userItemQuerySchema = {
  $id: 'UserItemQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(userItemSchema.properties),
    deleted_at: {}
  }
}
export const userItemQueryValidator = getValidator(userItemQuerySchema, queryValidator)
export const userItemQueryResolver = resolve({})
