const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res) => {
  db.Polls.find()
    .then((polls) => {
      res.json(polls);
    })
    .catch((err) =>res.json(err))
})

router.post('/',  (req, res) => {
  db.Polls.create(req.body)
    .then((newPoll) => {
      res.status(201)
        .json(newPoll);
    })
    .catch((err) => res.send(err))
})

module.exports = router;