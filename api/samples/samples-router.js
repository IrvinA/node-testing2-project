const router = require('express').Router();
const Samples = require('./samples-model');

router.get('/', (req, res, next) => {
  Samples.getAll()
    .then((samples) => {
      res.status(200).json(samples);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Samples.getById(req.params.id)
    .then((sample) => {
      res.status(200).json(sample);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Samples.add(req.body)
    .then((sample) => {
      res.status(201).json(sample);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Samples.remove(req.params.id)
    .then((sample) => {
      res.status(200).json(sample);
    })
    .catch(next);
});

module.exports = router;
