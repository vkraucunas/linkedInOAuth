exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id');
    table.string('email').unique();
    table.string('linkedin_id').unique();
    table.string('preferred_name');
    table.string('last_name');
    table.string('avatar_url', 500);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};