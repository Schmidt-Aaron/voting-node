const mongoose = require("mongoose");

// fail gracefully
mongoose.set("debug", true);

// db location
mongoose.connect(
  "mongodb://localhost:27017/voting-node",
  { useNewUrlParser: true },
  err => {
    if (err) throw err;
    console.log(`Successfully connected to database.`);
  }
);

mongoose.Promise = Promise;

module.exports.Polls = require("./Polls");
