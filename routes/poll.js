const express = require('express');
const db = require('../models');

const router = express.Router();

// helper functions
// const findPoll = id => {
//   db.Poll.findById(id)
//     .then((poll) => {
//       return poll;
//     })
//     .catch(err => console.log(err))
// }

router.get('/:id', (req, res) => {
  db.Poll.findById(req.params.id).then(poll => {
    const pollObj = {
      pageTitle: poll.question,
      question: poll.question,
      author: poll.author,
      choices: poll.choices,
    };
    res.render('poll', pollObj);
  });
});

module.exports = router;
