// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app.js';

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
    // Simulate a logged-in user
    const mockUser = { id: 1 }; // Replace with appropriate user id

    // Set the context.params.user to the mock user
    const params = {
      user: mockUser
    };

    const book = await service.create({
      title: 'Test Book',
      subtitle: 'A Subtitle',
      authors: JSON.stringify(['Test Author']),
      publisher: 'Test Publisher',
      published_date: '2021-01-01',
      description: 'A test book description',
      printed_page_count: 100,
      categories: JSON.stringify(['Test Category']),
      thumbnail: 'http://example.com/thumbnail.jpg',
      preview_link: 'http://example.com/preview'
    }, params); // Pass the params with the mock user

    assert.ok(book.id, 'Created book has an id');
    assert.equal(book.title, 'Test Book', 'Created book has correct title');
    assert.equal(book.subtitle, 'A Subtitle', 'Created book has correct subtitle');
    assert.equal(book.authors, JSON.stringify(['Test Author']), 'Created book has correct authors');
    assert.equal(book.publisher, 'Test Publisher', 'Created book has correct publisher');
    assert.equal(
      new Date(book.published_date).toISOString().split('T')[0],
      '2021-01-01',
      'Created book has correct published date'
    );
    assert.equal(book.description, 'A test book description', 'Created book has correct description');
    assert.equal(book.printed_page_count, 100, 'Created book has correct printed page count');
    assert.equal(book.categories, JSON.stringify(['Test Category']), 'Created book has correct categories');
    assert.equal(book.thumbnail, 'http://example.com/thumbnail.jpg', 'Created book has correct thumbnail');
    assert.equal(book.preview_link, 'http://example.com/preview', 'Created book has correct preview link');
  });

  // This is an example of how to bypass the softDelete hook to retrieve all records
  // 
  // let fetchedBook;
  // try {
  //   const result = await app.get('knexClient')
  //     .select('*')
  //     .from('books')
  //     .where({ id: book.id });
  //   fetchedBook = result[0];
  // } catch (err) {
  //   console.error(err);
  // }


});