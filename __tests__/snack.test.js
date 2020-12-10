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
  
  it('', () => {

  });
  
  // it('', () => {

  // });

  // it('', () => {

  // });

  // it('', () => {

  // });

  // it('', () => {

  // });

});
