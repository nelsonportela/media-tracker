export async function up(knex) {
  await knex.schema.createTable('seasons', (table) => {
    table.increments('id')
    table.integer('series_id').unsigned().notNullable().references('id').inTable('series').onDelete('CASCADE');
    table.integer('tmdb_id').unsigned();
    table.integer('tmdb_series_id').unsigned();
    table.string('name');
    table.text('overview').nullable();
    table.date('air_date').nullable();
    table.integer('season_number').nullable();
    table.string('poster_path').nullable();
  })
}

export async function down(knex) {
  await knex.schema.dropTable('seasons')
}
