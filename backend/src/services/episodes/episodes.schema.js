// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const episodesSchema = {
  $id: 'Episodes',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    series_id: { type: 'number' },
    season_id: { type: 'number' },
    tmdb_id: { type: 'number' },
    tmdb_series_id: { type: 'number' },
    tmdb_season_id: { type: 'number' },
    name: { type: 'string' },
    overview: { type: 'string' },
    air_date: { type: 'string', format: 'date' },
    runtime: { type: 'number' },
    episode_number: { type: 'number' },
    season_number: { type: 'number' },
    still_path: { type: 'string' }
  }
}
export const episodesValidator = getValidator(episodesSchema, dataValidator)
export const episodesResolver = resolve({})

export const episodesExternalResolver = resolve({})

// Schema for creating new data
export const episodesDataSchema = {
  $id: 'EpisodesData',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...episodesSchema.properties
  }
}
export const episodesDataValidator = getValidator(episodesDataSchema, dataValidator)
export const episodesDataResolver = resolve({})

// Schema for updating existing data
export const episodesPatchSchema = {
  $id: 'EpisodesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...episodesSchema.properties
  }
}
export const episodesPatchValidator = getValidator(episodesPatchSchema, dataValidator)
export const episodesPatchResolver = resolve({})

// Schema for allowed query properties
export const episodesQuerySchema = {
  $id: 'EpisodesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(episodesSchema.properties)
  }
}
export const episodesQueryValidator = getValidator(episodesQuerySchema, queryValidator)
export const episodesQueryResolver = resolve({})
