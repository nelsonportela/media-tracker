export async function up(knex) {
  await knex.schema.createTable('series', (table) => {
    table.increments('id')
    table.integer('tmdb_id').unsigned();
    table.string('name');
    table.string('tagline').nullable();
    table.text('overview').nullable();
    table.date('first_air_date').nullable();
    table.date('last_air_date').nullable();
    table.date('next_episode_to_air').nullable();
    table.json('genres').nullable();
    table.boolean('in_production').defaultTo(false);
    table.integer('episodes').nullable();
    table.integer('seasons').nullable();
    table.json('production_companies').nullable();
    table.string('status').nullable();
    table.json('created_by').nullable();
    table.string('poster_path').nullable();
    table.string('tmdb_link').nullable();
  })
}

export async function down(knex) {
  await knex.schema.dropTable('series')
}