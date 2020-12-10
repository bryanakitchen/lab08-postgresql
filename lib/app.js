const express = require('express');
const Plant = require('./models/Plant');
const Snack = require('./models/Snack');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/api/v1/plants', (req, res, next) => {
  Plant
    .insert(req.body)
    .then(plant => res.send(plant))
    .catch(next);
});

app.post('/api/v1/snacks', (req, res, next) => {
  Snack
    .insert(req.body)
    .then(snack => res.send(snack))
    .catch(next);
});

app.get('/api/v1/plants', (req, res, next) => {
  Plant
    .find()
    .then(plants => res.send(plants))
    .catch(next);
});

app.get('/api/v1/snacks', (req, res, next) => {
  Snack
    .find()
    .then(snacks => res.send(snacks))
    .catch(next);
});

app.get('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .findById(req.params.id)
    .then(plant => res.send(plant))
    .catch(next);
});

app.get('/api/v1/snacks/:id', (req, res, next) => {
  Snack
    .findById(req.params.id)
    .then(snack => res.send(snack))
    .catch(next);
});

app.put('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .update(req.params.id, req.body)
    .then(plant => res.send(plant))
    .catch(next);
});

app.put('/api/v1/snacks/:id', (req, res, next) => {
  Snack
    .update(req.params.id, req.body)
    .then(snack => res.send(snack))
    .catch(next);
});

app.delete('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .delete(req.params.id)
    .then(plant => res.send(plant))
    .catch(next);
});

app.delete('/api/v1/snacks/:id', (req, res, next) => {
  Snack
    .delete(req.params.id)
    .then(snack => res.send(snack))
    .catch(next);
});

module.exports = app;
