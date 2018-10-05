const mongoose = require("mongoose");

// fail gracefully
mongoose.set("debug", true);

// db location
mongoose.connect("mongodb://localhost:27017/voting-node");

mongoose.Promise = Promise;

<<<<<<< HEAD
module.exports.Poll = require("./Poll");
=======
module.exports.Polls = require('./Polls');
>>>>>>> merging-routes
