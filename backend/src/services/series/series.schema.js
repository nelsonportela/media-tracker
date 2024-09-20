// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const seriesSchema = {
  $id: 'Series',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    tmdb_id: { type: 'number' },
    name: { type: 'string' },
    tagline: { type: 'string' },
    overview: { type: 'string' },
    first_air_date: { type: 'string', format: 'date' },
    last_air_date: { type: 'string', format: 'date' },
    next_episode_to_air: {
      anyOf: [
        { type: 'string', format: 'date' },
        { type: 'null' }
    ]},
    genres: { type: 'string' }, // Define as string since it's stored as JSON string
    in_production: { type: 'boolean' },
    episodes: { type: 'number' },
    seasons: { type: 'number' },
    production_companies: { type: 'string' },
    status: { type: 'string' },
    created_by: { type: 'string' }, // Define as string since it's stored as JSON string
    poster_path: { type: 'string' },
    tmdb_link: { type: 'string' },
  }
}
export const seriesValidator = getValidator(seriesSchema, dataValidator)
export const seriesResolver = resolve({})

export const seriesExternalResolver = resolve({})

// Schema for creating new data
export const seriesDataSchema = {
  $id: 'SeriesData',
  type: 'object',
  additionalProperties: false,
  required: ['name'],
  properties: {
    ...seriesSchema.properties
  }
}
export const seriesDataValidator = getValidator(seriesDataSchema, dataValidator)
export const seriesDataResolver = resolve({})

// Schema for updating existing data
export const seriesPatchSchema = {
  $id: 'SeriesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...seriesSchema.properties
  }
}
export const seriesPatchValidator = getValidator(seriesPatchSchema, dataValidator)
export const seriesPatchResolver = resolve({})

// Schema for allowed query properties
export const seriesQuerySchema = {
  $id: 'SeriesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(seriesSchema.properties),
    type: { type: 'string' }
  }
}
export const seriesQueryValidator = getValidator(seriesQuerySchema, queryValidator)
export const seriesQueryResolver = resolve({})
