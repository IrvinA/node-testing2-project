exports.up = function (knex) {
  return knex.schema.createTable('samples', (tbl) => {
    tbl.increments('sample_id');
    tbl.string('name', 255).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('samples');
};
