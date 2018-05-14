const express = require('express');
const db = require('../models');

const router = express.Router();

// helper functions
const findPoll = id => {
  db.Poll.findById(id)
    .then(poll => {
      return poll;
    })
    .catch(err => console.log(err));
};

router.get('/:id', (req, res) => {
  db.Poll.findById(req.params.id).then(poll => {

    let choices = [];
    let votes = [];

    poll.choices.forEach((item) => {
      votes.push(item.votes);
      choices.push(item.choiceText);
    })

    const pollObj = {
      pageTitle: poll.question,
      question: poll.question,
      author: poll.author,
      choices,
      votes,
      pollID: req.params.id,
    };
    console.log(pollObj);
    res.render('poll', pollObj);
  });
});

module.exports = router;
