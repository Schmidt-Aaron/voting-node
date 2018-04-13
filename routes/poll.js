const express = require('express');
const router = express.Router();
const db = require('../models');

//helper functions
// const findPoll = id => {
//   db.Poll.findById(id)
//     .then((poll) => {
//       return poll;
//     })
//     .catch(err => console.log(err))
// }


router.get('/:id', (req, res) => {
  db.Poll.findById(req.params.id)
  .then((poll) => {
    console.log(poll)
        let pollObj = {
          question: poll.question,
          author: poll.author,
        };
        res.render('poll', pollObj )
  })

});

module.exports = router;