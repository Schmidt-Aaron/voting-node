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

    let choices = '';
    let votes = [];

    poll.choices.forEach((item, i) => {
      votes.push(item.votes);
      choices += item.choiceText;
      // add spaces to string - will be split in template
      if(i !== poll.choices.length - 1) {
        choices += " ";
      }
    })

    const pollObj = {
      pageTitle: poll.question,
      question: poll.question,
      author: poll.author,
      choices,
      votes,
      pollID: req.params.id,
    };
    res.render('poll', pollObj);
  });
});

module.exports = router;
