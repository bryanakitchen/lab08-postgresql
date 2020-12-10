const fs = require('fs');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Plant = require('../lib/models/Plant');

describe('CRUD routes for Plant model', () => {
  
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('Adds a Plant via POST', async() => {
    const res = await request(app)
      .post('/api/v1/plants')
      .send({
        location: 'Chattanooga, TN'
      });

    expect(res.body).toEqual({
      id: '1',
      location: 'Chattanooga, TN'
    });
  });

  it('Finds all Plants via GET', async() => {
    const plants = await Promise.all([
      {
        location: 'Chattanooga, TN'
      },
      {
        location: 'Gentry, AR'
      },
      {
        location: 'Stuarts Draft, VA'
      }
    ].map(plant => Plant.insert(plant)));

    const res = await request(app)
      .get('/api/v1/plants');

    expect(res.body).toEqual(expect.arrayContaining(plants));
    expect(res.body).toHaveLength(plants.length);
  });

  it('Finds a Plant by id via GET', async() => {
    const plant = await Plant.insert({
      location: 'Chattanooga, TN'
    });
    
    const res = await request(app)
      .get(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual({
      id: '1',
      location: 'Chattanooga, TN'
    });
  });

  it('Updates a Plant by id via PUT', async() => {
    const plant = await Plant.insert({
      location: 'Chattanooga, TN'
    });

    const res = await request(app)
      .put(`/api/v1/plants/${plant.id}`)
      .send({
        location: 'Gentry, AR'
      });

    expect(res.body).toEqual({
      id: '1',
      location: 'Gentry, AR'
    });
  });

  it('Deletes a Plant by id via DELETE', async() => {
    const plant = await Plant.insert({
      location: 'Chattanooga, TN'
    });

    const res = await request(app)
      .delete(`/api/v1/plants/${plant.id}`);

    expect(res.body).toEqual({
      id: '1',
      location: 'Chattanooga, TN'
    });
  });

});

