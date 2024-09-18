export async function up(knex) {
  await knex.schema.createTable('books', (table) => {
    table.increments('id')
    table.string('googleVolumeId').nullable();
    table.string('title');
    table.string('subtitle').nullable();
    table.json('authors').nullable();
    table.string('publisher').nullable();
    table.date('publishedDate').nullable();
    table.text('description').nullable();
    table.integer('printedPageCount').nullable();
    table.json('categories').nullable();
    table.text('thumbnail').nullable();
    table.string('previewLink').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
  })
}

export async function down(knex) {
  await knex.schema.dropTable('books')
}
