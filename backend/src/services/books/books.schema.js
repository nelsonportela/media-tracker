// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const bookSchema = {
  $id: 'Book',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    title: { type: 'string' },
    subtitle: { type: 'string' },
    authors: { type: 'string' }, // Define as string since it's stored as JSON string
    publisher: { type: 'string' },
    publishedDate: { type: 'string', format: 'date' },
    description: { type: 'string' },
    printedPageCount: { type: 'number' },
    categories: { type: 'string' }, // Define as string since it's stored as JSON string
    thumbnail: { type: 'string' },
    previewLink: { type: 'string' },
  }
}
export const bookValidator = getValidator(bookSchema, dataValidator)
export const bookResolver = resolve({})

export const bookExternalResolver = resolve({})

// Schema for creating new data
export const bookDataSchema = {
  $id: 'BookData',
  type: 'object',
  additionalProperties: false,
  required: ['googleVolumeId','title'],
  properties: {
    ...bookSchema.properties,
    googleVolumeId: { type: 'string' }
  }
}
export const bookDataValidator = getValidator(bookDataSchema, dataValidator)
export const bookDataResolver = resolve({})

// Schema for updating existing data
export const bookPatchSchema = {
  $id: 'BookPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...bookSchema.properties,
    deletedAt: {}
  }
}
export const bookPatchValidator = getValidator(bookPatchSchema, dataValidator)
export const bookPatchResolver = resolve({})

// Schema for allowed query properties
export const bookQuerySchema = {
  $id: 'BookQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(bookSchema.properties),
    deletedAt: {}
  }
}
export const bookQueryValidator = getValidator(bookQuerySchema, queryValidator)
export const bookQueryResolver = resolve({})
