/**
 * Run the migrations.
 *
 * This function creates the 'user_item' table with the following columns:
 * - id: Primary key, auto-incremented
 * - user_id: Foreign key referencing 'users' table
 * - item_id: Integer, not nullable
 * - item_type_id: Foreign key referencing 'item_types' table
 * - status_id: Foreign key referencing 'item_status' table
 * - created_at: Timestamp, defaults to current time
 * - updated_at: DateTime, defaults to current time and updates on modification
 * - deleted_at: Timestamp, nullable
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema.createTable('user_item', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('item_id').unsigned().notNullable();
    table.integer('item_type_id').unsigned().notNullable().references('id').inTable('item_types');
    table.integer('status_id').unsigned().notNullable().references('id').inTable('item_status');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('deleted_at');
  });
}

/**
 * Reverse the migrations.
 *
 * This function drops the 'user_item' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function down(knex) {
  await knex.schema.dropTable('user_item');
}