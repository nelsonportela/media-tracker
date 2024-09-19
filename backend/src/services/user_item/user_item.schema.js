// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const userItemStatusSchema = {
  $id: 'UserItemStatus',
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
export const userItemStatusValidator = getValidator(userItemStatusSchema, dataValidator)
export const userItemStatusResolver = resolve({})

export const userItemStatusExternalResolver = resolve({})

// Schema for creating new data
export const userItemStatusDataSchema = {
  $id: 'UserItemStatusData',
  type: 'object',
  additionalProperties: false,
  required: ['status_id'],
  properties: {
    ...userItemStatusSchema.properties
  }
}
export const userItemStatusDataValidator = getValidator(userItemStatusDataSchema, dataValidator)
export const userItemStatusDataResolver = resolve({})

// Schema for updating existing data
export const userItemStatusPatchSchema = {
  $id: 'UserItemStatusPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...userItemStatusSchema.properties,
    deleted_at: {}
  }
}
export const userItemStatusPatchValidator = getValidator(userItemStatusPatchSchema, dataValidator)
export const userItemStatusPatchResolver = resolve({})

// Schema for allowed query properties
export const userItemStatusQuerySchema = {
  $id: 'UserItemStatusQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(userItemStatusSchema.properties),
    deleted_at: {}
  }
}
export const userItemStatusQueryValidator = getValidator(userItemStatusQuerySchema, queryValidator)
export const userItemStatusQueryResolver = resolve({})
