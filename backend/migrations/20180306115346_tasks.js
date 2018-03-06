
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('tasks', (table) => {
        table.increments('id').primary()
        table.string('title').unique().notNullable() 
        table.boolean('done').notNullable()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tasks')
  
};
