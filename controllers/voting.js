const mongoose = require('mongoose');
const Polls = mongoose.model('Polls');
const db = require('../models');

// helpers - refactor later
const parsePollData = choiceArr => {
  return choiceArr.map(choice => {
    const obj = {
      choiceText: choice,
    };
    return obj;
  });
};

const findPoll = id => {
  db.Polls.findById(id)
    .then(poll => {
      return poll;
    })
    .catch(err => console.log(err));
};


exports.getPolls = async (req, res) => {
  const pollData = await db.Polls.find();
    // .then(polls => {
    //   pollData.push(polls);
    // })
    // .catch(err => res.json(err))

  res.render('index', { pageTitle: 'Welcome to the Amazing Poll Machine', pollData })
};

exports.addNew = (req, res) => {
  res.render('new', { pageTitle: 'Add a New Poll!' })
}

exports.renderPollById = (req, res) => {
  db.Polls.findById(req.params.id).then(poll => {

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
};

exports.getAllPolls = (req, res) => {
  db.Polls.find()
    .then(polls => {
      res.json(polls);
    })
    .catch(err => res.json(err));
};

exports.addNewPoll = (req, res) => {
  const formData = req.body;
  const pollChoices = parsePollData(formData.choices);
  const pollBody = {
    question: formData.question,
    author: formData.author,
    choices: pollChoices,
  };

  db.Polls.create(pollBody)
    .then(newPoll => {
      // res.status(201).json(newPoll); // uncomment to see json response
      // console.log(newPoll);
      res.redirect('./');
    })
    .catch(err => res.send(err));
};

exports.getSinglePollData = (req, res) => {
  db.Polls.findById(req.params.pollID)
    .then(poll => {
      res.json(poll);
    })
    .catch(err => res.send(err));
};

exports.deleteSinglePoll = (req, res) => {
  db.Polls.deleteOne({ _id: req.params.pollID })
    .then(() => {
      res.json(`${req.params.pollID} was deleted.`);
    })
    .catch(err => res.send(err));
};

exports.vote = (req, res) => {
  
  const ID = req.params.pollID;
  const vote = req.body.choice;
  console.log(vote);
  
  db.Polls.update(
    { _id: ID, "choices.choiceText": vote },
    { $inc: { "choices.$.votes": 1 } }
  ).then(poll => console.log(poll))

  res.redirect(`/api/poll/${ID}`);
};