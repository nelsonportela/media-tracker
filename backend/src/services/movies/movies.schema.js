// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const moviesSchema = {
  $id: 'Movies',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    tmdb_id: { type: 'number' },
    title: { type: 'string' },
    tagline: { type: 'string' },
    credits: { type: 'string' }, // Define as string since it's stored as JSON string
    production_companies: { type: 'string' },
    release_date: { type: 'string', format: 'date' },
    overview: { type: 'string' },
    runtime: { type: 'number' },
    genres: { type: 'string' }, // Define as string since it's stored as JSON string
    poster_path: { type: 'string' },
    tmdb_link: { type: 'string' },
  }
}
export const moviesValidator = getValidator(moviesSchema, dataValidator)
export const moviesResolver = resolve({})

export const moviesExternalResolver = resolve({})

// Schema for creating new data
export const moviesDataSchema = {
  $id: 'MoviesData',
  type: 'object',
  additionalProperties: false,
  required: ['title'],
  properties: {
    ...moviesSchema.properties,
  }
}
export const moviesDataValidator = getValidator(moviesDataSchema, dataValidator)
export const moviesDataResolver = resolve({})

// Schema for updating existing data
export const moviesPatchSchema = {
  $id: 'MoviesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...moviesSchema.properties
  }
}
export const moviesPatchValidator = getValidator(moviesPatchSchema, dataValidator)
export const moviesPatchResolver = resolve({})

// Schema for allowed query properties
export const moviesQuerySchema = {
  $id: 'MoviesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(moviesSchema.properties),
    type: { type: 'string' }
  }
}
export const moviesQueryValidator = getValidator(moviesQuerySchema, queryValidator)
export const moviesQueryResolver = resolve({})
