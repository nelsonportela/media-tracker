export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('email').unique()
    table.string('password')
    table.string('name')
  })

      // Insert initial data
      await knex('users').insert([
        { email: 'admin', password: '$2a$10$XydCkDDqZBZEEWXgBj0l7.C3VPtyW0w2Qf6KPXqAZ10zEI0b.2k1i'}
    ]);
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}