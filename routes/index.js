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

// add new polls
router.get('/new', (req, res) => {
  // res.sendFile("views/new.html", { root: __dirname});
  res.render('new', { pageTitle: 'Add a New Poll!' });
});

router.get('/poll/:id', (req, res) => {
  db.Poll.findById(req.params.id).then(poll => {

    let choices = '';
    const votes = [];

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

//API routes

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
router.get('/api', (req, res) => {
  db.Poll.find()
    .then(polls => {
      res.json(polls);
    })
    .catch(err => res.json(err));
});

// post a poll
router.post('/api', (req, res) => {
  console.log(req.body);
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
      // console.log(newPoll);
      res.redirect('./');
    })
    .catch(err => res.send(err));
});

// get poll by ID
router.get('api/:pollID', (req, res) => {
  db.Poll.findById(req.params.pollID)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => res.send(err));
});

// delete a poll
router.delete('/api/:pollID', (req, res) => {
  db.Poll.deleteOne({ _id: req.params.pollID })
    .then(() => {
      res.json(`${req.params.pollID} was deleted.`);
    })
    .catch(err => res.send(err));
});

// vote on a poll
router.post('/api/:pollID', (req, res) => {
  // make call to db
  
  const ID = req.params.pollID;
  const vote = req.body.choice;
  console.log(vote);
  
  db.Poll.update(
    { _id: ID, "choices.choiceText": vote },
    { $inc: { "choices.$.votes": 1 } }
  ).then(poll => console.log(poll))

  res.redirect(`/api/poll/${ID}`);
});

module.exports = router;
