export async function up(knex) {
  await knex.schema.createTable('movies', (table) => {
    table.increments('id')
    table.integer('tmdb_id').unsigned();
    table.string('title');
    table.string('tagline').nullable();
    table.json('credits').nullable();
    table.json('production_companies').nullable();
    table.date('release_date').nullable();
    table.text('overview').nullable();
    table.integer('runtime').nullable();
    table.json('genres').nullable();
    table.string('poster_path').nullable();
    table.string('tmdb_link').nullable();
  })
}

export async function down(knex) {
  await knex.schema.dropTable('movies')
}