const samples = [
  { name: 'Jose' },
  { name: 'John' },
  { name: 'Mark' },
  { name: 'Lisa' },
  { name: 'Mary' },
  { name: 'Luis' },
  { name: 'Lois' },
  { name: 'Zach' },
  { name: 'Fred' },
  { name: 'Daphne' },
];

// eslint-disable-next-line no-unused-vars
exports.seed = function (knex, Promise) {
  return knex('samples')
    .truncate()
    .then(function () {
      return knex('samples').insert(samples);
    });
};
