const Sample = require('../api/samples/samples-model');
const db = require('../data/db-config');
const { samples } = require('../data/seeds/01-sample');

test('is testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing');
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
