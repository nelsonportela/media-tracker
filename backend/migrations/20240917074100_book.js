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

export async function down(knex) {
  await knex.schema.dropTable('books')
}
