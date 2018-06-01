const express = require('express');
const db = require('../models');
const voting = require('../controllers/voting');

const router = express.Router();

// root route
router.get('/', voting.getPolls);

// add new polls
router.get('/new', voting.addNew);

// render individual poll
router.get('/poll/:id', voting.renderPollById);

// API routes

// get all polls
router.get('/api', voting.getAllPolls);

// post a poll
router.post('/api', voting.addNewPoll);

// get pollData by ID
router.get('api/:pollID', voting.getSinglePollData);

// delete a poll
router.delete('/api/:pollID', voting.deleteSinglePoll);

// vote on a poll
router.post('/api/:pollID', voting.vote);

module.exports = router;
