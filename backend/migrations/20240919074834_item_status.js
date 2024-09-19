export async function up(knex) {
    await knex.schema.createTable('item_status', table => {
        table.increments('id');
        table.string('status_name');
    });

    // Insert initial data
    await knex('item_status').insert([
        { status_name: 'active' },
        { status_name: 'paused' },
        { status_name: 'dropped' },
        { status_name: 'completed' },
        { status_name: 'waiting' },
    ]);
}

export async function down(knex) {
    await knex.schema.dropTable('item_status')
}