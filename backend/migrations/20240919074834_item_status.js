/**
 * Run the migrations.
 *
 * This function creates the 'item_status' table with the following columns:
 * - id: Primary key, auto-incremented
 * - status_name: String
 *
 * It also inserts initial data into the 'item_status' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function up(knex) {
    await knex.schema.createTable('item_status', table => {
        table.increments('id');
        table.string('status_name');
    });

    // Insert initial data
    await knex('item_status').insert([
        { status_name: 'active' },
        { status_name: 'paused' },
        { status_name: 'dropped' },
        { status_name: 'completed' },
        { status_name: 'waiting' },
    ]);
}

/**
 * Reverse the migrations.
 *
 * This function drops the 'item_status' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function down(knex) {
    await knex.schema.dropTable('item_status')
}