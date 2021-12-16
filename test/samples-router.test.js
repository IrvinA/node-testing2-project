const server = require('../api/server');
const request = require('supertest');
const db = require('../data/db-config');

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

describe('[GET] /api/samples', () => {
  test('responds with all the samples', async () => {
    const res = await request(server).get('/api/samples');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(10);
  });
});

describe('[GET] /api/samples/:id', () => {
  test('responds with Jose', async () => {
    const res = await request(server).get('/api/samples/1');
    expect(res.body).toMatchObject({ sample_id: 1, name: 'Jose' });
  });
  test('responds with status 200', async () => {
    const res = await request(server).get('/api/samples/1');
    expect(res.status).toBe(200);
  });
});

describe('[POST] /api/samples', () => {
  test('responds with new sample', async () => {
    const res = await request(server)
      .post('/api/samples')
      .send({ name: 'Irvin' });
    expect(res.body).toMatchObject({ sample_id: 11, name: 'Irvin' });
  });
  test('responds with status 201', async () => {
    const res = await request(server)
      .post('/api/samples')
      .send({ name: 'Irvin' });
    expect(res.status).toBe(201);
  });
});

describe('[DELETE] /api/samples/:id', () => {
  test('responds with deleted sample', async () => {
    const res = await request(server).delete('/api/samples/1');
    expect(res.body).toMatchObject({ sample_id: 1, name: 'Jose' });
  });
  test('responds with status 200', async () => {
    const res = await request(server).delete('/api/samples/1');
    expect(res.status).toBe(200);
  });
});
