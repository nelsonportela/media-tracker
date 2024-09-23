// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const seasonsSchema = {
  $id: 'Seasons',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    series_id: { type: 'number' },
    tmdb_id: { type: 'number' },
    tmdb_series_id: { type: 'number' },
    name: { type: 'string' },
    overview: { type: 'string' },
    air_date: { type: 'string', format: 'date' },
    season_number: { type: 'number' },
    poster_path: { type: 'string' }
  }
}
export const seasonsValidator = getValidator(seasonsSchema, dataValidator)
export const seasonsResolver = resolve({})

export const seasonsExternalResolver = resolve({})

// Schema for creating new data
export const seasonsDataSchema = {
  $id: 'SeasonsData',
  type: 'object',
  additionalProperties: false,
  required: ['tmdb_series_id'],
  properties: {
    ...seasonsSchema.properties
  }
}
export const seasonsDataValidator = getValidator(seasonsDataSchema, dataValidator)
export const seasonsDataResolver = resolve({})

// Schema for updating existing data
export const seasonsPatchSchema = {
  $id: 'SeasonsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...seasonsSchema.properties
  }
}
export const seasonsPatchValidator = getValidator(seasonsPatchSchema, dataValidator)
export const seasonsPatchResolver = resolve({})

// Schema for allowed query properties
export const seasonsQuerySchema = {
  $id: 'SeasonsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(seasonsSchema.properties),
    type: { type: 'string' }
  }
}
export const seasonsQueryValidator = getValidator(seasonsQuerySchema, queryValidator)
export const seasonsQueryResolver = resolve({})
