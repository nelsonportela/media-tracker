export async function up(knex) {
  await knex.schema.createTable('episodes', (table) => {
    table.increments('id')
    table.integer('series_id').unsigned().notNullable().references('id').inTable('series').onDelete('CASCADE');
    table.integer('season_id').unsigned().notNullable().references('id').inTable('seasons').onDelete('CASCADE');
    table.integer('tmdb_id').unsigned();
    table.integer('tmdb_series_id').unsigned();
    table.integer('tmdb_season_id').unsigned();
    table.string('name');
    table.text('overview').nullable();
    table.date('air_date').nullable();
    table.integer('runtime').unsigned();
    table.integer('episode_number').nullable();
    table.integer('season_number').nullable();
    table.string('still_path').nullable();
  })
}

export async function down(knex) {
  await knex.schema.dropTable('episodes')
}
