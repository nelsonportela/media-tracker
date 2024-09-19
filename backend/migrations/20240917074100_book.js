/**
 * Run the migrations.
 *
 * This function creates the 'books' table with the following columns:
 * - id: Primary key, auto-incremented
 * - google_volume_id: String, nullable
 * - title: String
 * - subtitle: String, nullable
 * - authors: JSON, nullable
 * - publisher: String, nullable
 * - published_date: Date, nullable
 * - description: Text, nullable
 * - printed_page_count: Integer, nullable
 * - categories: JSON, nullable
 * - thumbnail: Text, nullable
 * - preview_link: String, nullable
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function up(knex) {
  await knex.schema.createTable('books', (table) => {
    table.increments('id')
    table.string('google_volume_id').nullable();
    table.string('title');
    table.string('subtitle').nullable();
    table.json('authors').nullable();
    table.string('publisher').nullable();
    table.date('published_date').nullable();
    table.text('description').nullable();
    table.integer('printed_page_count').nullable();
    table.json('categories').nullable();
    table.text('thumbnail').nullable();
    table.string('preview_link').nullable();
  })
}

/**
 * Reverse the migrations.
 *
 * This function drops the 'books' table.
 *
 * @param {object} knex - The knex instance.
 * @returns {Promise<void>}
 */
export async function down(knex) {
  await knex.schema.dropTable('books')
}
