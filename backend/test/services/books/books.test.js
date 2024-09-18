// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app.js';
// import { DateTime } from 'luxon';

import knex from 'knex'
import knexConfig from '../../../knexfile.js'

const dbClient = knex(knexConfig)
app.set('knexClient', dbClient)

describe('books service', () => {
  let service;

  before(() => {
    service = app.service('books');
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('creates a book', async () => {
    const book = await service.create({
      title: 'Test Book',
      subtitle: 'A Subtitle',
      authors: JSON.stringify(['Test Author']),
      publisher: 'Test Publisher',
      publishedDate: '2021-01-01',
      description: 'A test book description',
      printedPageCount: 100,
      categories: JSON.stringify(['Test Category']),
      thumbnail: 'http://example.com/thumbnail.jpg',
      previewLink: 'http://example.com/preview'
    });

    assert.ok(book.id, 'Created book has an id');
    assert.equal(book.title, 'Test Book', 'Created book has correct title');
    assert.equal(book.subtitle, 'A Subtitle', 'Created book has correct subtitle');
    assert.equal(book.authors, JSON.stringify(['Test Author']), 'Created book has correct authors');
    assert.equal(book.publisher, 'Test Publisher', 'Created book has correct publisher');
    assert.equal(
      new Date(book.publishedDate).toISOString().split('T')[0],
      '2021-01-01',
      'Created book has correct published date'
    );
    assert.equal(book.description, 'A test book description', 'Created book has correct description');
    assert.equal(book.printedPageCount, 100, 'Created book has correct printed page count');
    assert.equal(book.categories, JSON.stringify(['Test Category']), 'Created book has correct categories');
    assert.equal(book.thumbnail, 'http://example.com/thumbnail.jpg', 'Created book has correct thumbnail');
    assert.equal(book.previewLink, 'http://example.com/preview', 'Created book has correct preview link');
  });

  it('soft deletes a book', async () => {
    // Create a book to delete
    const book = await service.create({
      title: 'Book to Delete',
      subtitle: 'A Subtitle',
      authors: JSON.stringify(['Author']),
      publisher: 'Publisher',
      publishedDate: '2021-01-01',
      description: 'A book to delete',
      printedPageCount: 100,
      categories: JSON.stringify(['Category']),
      thumbnail: 'http://example.com/thumbnail.jpg',
      previewLink: 'http://example.com/preview'
    });
  
    // Soft delete the book
    const deletedBook = await service.remove(book.id);

    assert.ok(deletedBook.deletedAt, 'Deleted book has a deletedAt field');
    
    // Use JavaScript's Date object to validate the date-time
    const isValidDateTime = !isNaN(Date.parse(deletedBook.deletedAt));
  
    assert.equal(
      isValidDateTime,
      true,
      'deletedAt field is a valid date-time'
    );
  });

  it('does not actually remove the book from the database', async () => {
    // Create a book to delete
    const book = await service.create({
      title: 'Book to Delete Permanently',
      subtitle: 'A Subtitle',
      authors: JSON.stringify(['Author']),
      publisher: 'Publisher',
      publishedDate: '2021-01-01',
      description: 'A book to delete permanently',
      printedPageCount: 100,
      categories: JSON.stringify(['Category']),
      thumbnail: 'http://example.com/thumbnail.jpg',
      previewLink: 'http://example.com/preview'
    });

    // Soft delete the book
    await service.remove(book.id);
    
    // Try to get the book by id
    let fetchedBook;
    try {
      const result = await app.get('knexClient')
        .select('*')
        .from('books')
        .where({ id: book.id });
      fetchedBook = result[0];
    } catch (err) {
      console.error(err);
    }
    
    assert.ok(fetchedBook, 'Book still exists in the database');
    assert.ok(fetchedBook.deletedAt, 'Fetched book has a deletedAt field');
  });
});