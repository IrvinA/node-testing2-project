const { request } = require('express');
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

describe('Samples model', () => {
  describe('getAll()', () => {
    beforeEach(async () => {
      data = await Sample.getAll();
    });
    test('resolves all samples in the db', async () => {
      expect(data.length).toBe(10);
      expect(data).toHaveLength(10);
    });
    test('resolves to correct data shape', async () => {
      expect(data).toMatchObject(samples);
    });
  });
  describe('getById()', () => {
    test('returns the correct sample', async () => {
      const data = await Sample.getById('1');
      expect(data).toMatchObject({ sample_id: 1, name: 'Jose' });
    });
  });
  describe('add()', () => {
    test('creates new sample in the db', async () => {
      await Sample.add({ name: 'Irvin' });
      const [Irvin] = await db('samples').where('sample_id', 11);
      expect(Irvin).toMatchObject({ sample_id: 11, name: 'Irvin' });
    });
    test('resolves the new sample with sample_id and name', async () => {
      const result = await Sample.add({ name: 'Irvin' });
      expect(result).toMatchObject({ sample_id: 11, name: 'Irvin' });
    });
  });
  describe('remove()', () => {
    test('deletes sample with given id in the db', async () => {
      await Sample.remove('1');
      const data = await Sample.getAll();
      expect(data).toHaveLength(9);
    });
    test('resolves to deleted sample with sample_id and name', async () => {
      const result = await Sample.remove('1');
      expect(result).toMatchObject({ sample_id: 1, name: 'Jose' });
    });
  });
});
