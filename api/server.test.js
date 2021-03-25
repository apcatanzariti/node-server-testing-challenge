const server = require('./server');

const request = require('supertest');

const db = require('../data/db-config');

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

it('process.env.DB_ENV must be "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('testing adding a car to the database', () => {

    describe('[POST] /cars', () => {

        it('tests that a new car does actually get added', async () => {
            await request(server)
            .post('/cars')
            .send({ make: 'Honda', model: 'Accord' });

            const cars = await db('cars');

            expect(cars).toHaveLength(5);
        });

        it('responds with the new car', async () => {
            const res = await request(server)
            .post('/cars')
            .send({ make: 'Honda', model: 'Accord' });

            expect(res.body).toMatchObject({ id: 5, make: 'Honda', model: 'Accord' });
        });
    });
});

describe('testing removing a car from the database', () => {

    describe('[DELETE] /car/:id', () => {

        it('tests that item is removed from the database', async () => {
            await request(server).delete('/cars/4');

            const cars = await db('cars');

            expect(cars).toHaveLength(3);
        });

        it('tests the response from the delete', async () => {
            const res = await request(server).delete('/cars/4');

            expect(res.body).toEqual(1);
        });

        it('returns 0 if there is nothing to delete matching the id', async () => {
            const res = await request(server).delete('/cars/7');

            expect(res.body).toEqual(0);
        });
    });
});