const express = require('express');
const router = express.Router();
const db = require('../models');

//get all polls
router.get('/', (req, res) => {
  db.Poll.find()
    .then((polls) => {
      res.json(polls);
    })
    .catch((err) =>res.json(err))
})

//post a poll
router.post('/',  (req, res) => {
  let formData = req.body;
  let pollBody = {
    question: formData.question,
    author: formData.author,
    choices: [
      {
        choiceText: formData.option1, 
      },
      {
        choiceText: formData.option2, 
      },
    ]
  }

  db.Poll.create(pollBody)
    .then((newPoll) => {
      res.status(201)
        .json(newPoll);
    })
    .catch((err) => res.send(err))
})

//get poll by ID
router.get('/:pollID', (req, res) => {
  db.Poll.findById(req.params.pollID)
    .then((poll) => {
      res.json(poll)
    })
    .catch(err => res.send(err))
})

module.exports = router;