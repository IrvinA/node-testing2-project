const db = require('../../data/db-config');

function getAll() {
  return db('samples');
}

function getById(sample_id) {
  return db('samples').where('sample_id', sample_id).first();
}

function add(sample) {
  return db('samples')
    .insert(sample)
    .then(([sample_id]) => {
      return db('samples').where('sample_id', sample_id).first();
    });
}

async function remove(sample_id) {
  const sample = await db('samples').where('sample_id', sample_id).first();

  await db('samples').where('sample_id', sample_id).del();

  return sample;
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
};
