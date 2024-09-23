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
        { type_name: 'seasons' },
        { type_name: 'episodes' },
        { type_name: 'games' }
    ]);
}

export async function down(knex) {
    await knex.schema.dropTable('item_types')
}