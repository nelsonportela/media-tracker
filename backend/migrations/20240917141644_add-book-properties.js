/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.table('books', (table) => {
    table.dropColumn('text');
    table.string('googleVolumeId');
    table.string('title');
    table.string('subtitle');
    table.json('authors');
    table.string('publisher');
    table.date('publishedDate');
    table.text('description');
    table.integer('printedPageCount');
    table.json('categories');
    table.text('thumbnail');
    table.string('previewLink');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.table('books', (table) => {
    table.dropColumn('googleVolumeId');
    table.dropColumn('title');
    table.dropColumn('subtitle');
    table.dropColumn('authors');
    table.dropColumn('publisher');
    table.dropColumn('publishedDate');
    table.dropColumn('description');
    table.dropColumn('printedPageCount');
    table.dropColumn('categories');
    table.dropColumn('thumbnail');
    table.dropColumn('previewLink');
    table.dropColumn('createdAt');
    table.dropColumn('deletedAt');
    table.text('text');
  });
};