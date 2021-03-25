const Cars = require('./cars-model');

const db = require('../../data/db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('cars').truncate();
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

it('works', () => {
    expect(true).toBe(true);
});