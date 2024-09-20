// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert';
import { app } from '../../../src/app.js';

import knex from 'knex';
import knexConfig from '../../../knexfile.js';

const dbClient = knex(knexConfig);
app.set('knexClient', dbClient);

describe('user_item service', () => {
  let service;
  let params;

  before(() => {
    service = app.service('user_item');
  });

  beforeEach(() => {
    const mockUser = { id: 1 };
    params = { user: mockUser };
  });

  it('registered the service', () => {
    assert.ok(service, 'Registered the service');
  });

  it('creates a user_item', async () => {
    const userItem = await service.create({
      user_id: 1,
      item_id: 1,
      item_type_id: 1,
      status_id: 1,
      rating: 5,
      favourite: true
    }, params);

    assert.ok(userItem.id, 'Created user_item has an id');
    assert.equal(userItem.user_id, 1, 'Created user_item has correct user_id');
    assert.equal(userItem.item_id, 1, 'Created user_item has correct item_id');
    assert.equal(userItem.item_type_id, 1, 'Created user_item has correct item_type_id');
    assert.equal(userItem.status_id, 1, 'Created user_item has correct status_id');
    assert.equal(userItem.rating, 5, 'Created user_item has correct rating');
    assert.equal(userItem.favourite, true, 'Created user_item has correct favourite status');
  });

  it('gets a user_item', async () => {
    const userItem = await service.get(1);
    assert.ok(userItem, 'Fetched user_item');
    assert.equal(userItem.id, 1, 'Fetched user_item has correct id');
  });

  it('updates a user_item', async () => {
    const updatedUserItem = await service.patch(1, {
      rating: 4,
      favourite: false
    }, params);

    assert.equal(updatedUserItem.rating, 4, 'Updated user_item has correct rating');
    assert.equal(updatedUserItem.favourite, false, 'Updated user_item has correct favourite status');
  });

  it('removes a user_item', async () => {
    const removedUserItem = await service.remove(1, params);
    assert.equal(removedUserItem.id, 1, 'Removed user_item has correct id');
  });

  it('finds user_items', async () => {
    const userItems = await service.find(params);

    assert.ok(userItems.total, 'Found user_items');
  });
});