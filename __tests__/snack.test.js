const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Snack = require('../lib/models/Snack');

describe('CRUD routes for Snack model', () => {
  
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  
  it('Adds Snack via POST', async() => {
    const res = await request(app)
      .post('/api/v1/snacks')
      .send({
        name: 'Zebra Cakes'
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Zebra Cakes'
    });
  });
  
  it('Returns all Snacks via GET', async() => {
    const snacks = await Promise.all([
      {
        name: 'Nutty Buddy'
      },
      {
        name: 'Oatmeal Creme Pies'
      },
      {
        name: 'Star Crunch'
      },
    ].map(snack => Snack.insert(snack)));

    const res = await request(app)
      .get('/api/v1/snacks');
  
    expect(res.body).toEqual(expect.arrayContaining(snacks));
    expect(res.body).toHaveLength(snacks.length);
  });

  it('Returns one Snack by id via GET', async() => {
    const snack = await Snack.insert({
      name: 'Pumpkin Delights'
    });

    const res = await request(app)
      .get(`/api/v1/snacks/${snack.id}`);

    expect(res.body).toEqual({
      id: snack.id,
      name: 'Pumpkin Delights'
    });
  });

  it('Updates a Snack by id via PUT', async() => {
    const snack = await Snack.insert({
      name: 'Nutty Bar'
    });

    const res = await request(app)
      .put(`/api/v1/snacks/${snack.id}`)
      .send({
        name: 'Nutty Buddy'
      });

    expect(res.body).toEqual({
      id: snack.id,
      name: 'Nutty Buddy'
    });
  });

  it('Removes a Snack by id via DELETE', async() => {
    const snack = await Snack.insert({
      name: 'Swiss Cake Rolls'
    });

    const res = await request(app)
      .delete(`/api/v1/snacks/${snack.id}`);

    expect(res.body).toEqual({
      id: snack.id,
      name: 'Swiss Cake Rolls'
    });
  });

});
