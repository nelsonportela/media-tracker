export async function up(knex) {
  await knex.schema.createTable('user_item', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('item_id').unsigned().notNullable();
    table.integer('item_type_id').unsigned().notNullable().references('id').inTable('item_types');
    table.integer('status_id').unsigned().notNullable().references('id').inTable('item_status');
    table.integer('rating').unsigned().defaultTo(1).checkIn([0, 1, 2]);
    table.boolean('favourite').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('deleted_at');
  });
}

export async function down(knex) {
  await knex.schema.dropTable('user_item');
}