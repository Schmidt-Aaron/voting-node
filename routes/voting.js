const express = require('express');
const db = require('../models');

const router = express.Router();

// helpers - refactor later
const parsePollData = choiceArr => {
  return choiceArr.map(choice => {
    const obj = {
      choiceText: choice,
    };
    return obj;
  });
};

// get all polls
router.get('/', (req, res) => {
  db.Poll.find()
    .then(polls => {
      res.json(polls);
    })
    .catch(err => res.json(err));
});

// post a poll
router.post('/', (req, res) => {
  const formData = req.body;
  const pollChoices = parsePollData(formData.choices);
  const pollBody = {
    question: formData.question,
    author: formData.author,
    choices: pollChoices,
  };

  db.Poll.create(pollBody)
    .then(newPoll => {
      // res.status(201).json(newPoll); // uncomment to see json response
      console.log(newPoll);
      res.redirect('/');
    })
    .catch(err => res.send(err));
});

// get poll by ID
router.get('/:pollID', (req, res) => {
  db.Poll.findById(req.params.pollID)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => res.send(err));
});

// delete a poll
router.delete('/:pollID', (req, res) => {
  db.Poll.deleteOne({ _id: req.params.pollID })
    .then(() => {
      res.json(`${req.params.pollID} was deleted.`);
    })
    .catch(err => res.send(err));
});

router.put('/:pollID', (req, res) => {
  // make call to db
  console.log(req.body);
  // db.Poll.update({ _id: id })
});

module.exports = router;
