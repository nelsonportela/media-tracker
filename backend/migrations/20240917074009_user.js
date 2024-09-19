/**
 * Run the migrations.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('password')
    table.string('name')
  })
}

/**
 * Reverse the migrations.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function down(knex) {
  await knex.schema.dropTable('users')
}