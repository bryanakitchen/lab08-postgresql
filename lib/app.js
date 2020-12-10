const express = require('express');
const Plant = require('./models/Plant');
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

app.get('/api/v1/plants', (req, res, next) => {
  Plant
    .find()
    .then(plants => res.send(plants))
    .catch(next);
});

app.get('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .findById(req.params.id)
    .then(plant => res.send(plant))
    .catch(next);
});

app.put('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .update(req.params.id, req.body)
    .then(plant => res.send(plant))
    .catch(next);
});

app.delete('/api/v1/plants/:id', (req, res, next) => {
  Plant
    .delete(req.params.id)
    .then(plant => res.send(plant))
    .catch(next);
});

module.exports = app;
