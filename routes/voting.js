const express = require('express');
const router = express.Router();
const db = require('../models');

//helpers - refactor later
const parsePollData = (choiceArr) => {
  return choiceArr.map(choice => { 
    let obj = {
      choiceText: choice
    };
    return obj;
  })
}

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
  let pollChoices = parsePollData(formData.choices);
  let pollBody = {
    question: formData.question,
    author: formData.author,
    choices: pollChoices,
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

//delete a poll
router.delete('/:pollID', (req, res) => {
  db.Poll.deleteOne(
    { _id: req.params.pollID }
  )
    .then(() => {
      res.json(`${req.params.pollID} was deleted.`)
    })
    .catch(err => res.send(err))
})

module.exports = router;