/**
 * Run the migrations.
 *
 * This function creates the 'item_types' table with the following columns:
 * - id: Primary key, auto-incremented
 * - type_name: String
 *
 * It also inserts initial data into the 'item_types' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function up(knex) {
    await knex.schema.createTable('item_types', table => {
        table.increments('id');
        table.string('type_name');
    });

    // Insert initial data
    await knex('item_types').insert([
        { type_name: 'books' },
        { type_name: 'movies' },
        { type_name: 'series' },
        { type_name: 'games' }
    ]);
}

/**
 * Reverse the migrations.
 *
 * This function drops the 'item_types' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function down(knex) {
    await knex.schema.dropTable('item_types')
}