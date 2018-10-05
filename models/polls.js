const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: "Poll cannot be blank"
    },

    author: {
      type: String
    },

    choices: [
      {
        choiceText: String,
        votes: {
          type: Number,
          required: true,
          default: 0
        }
      }
    ],

    date: {
      type: Date,
      default: Date.now()
    }
  },
  { collection: "poll" }
);

const Polls = mongoose.model("Polls", pollSchema);

module.exports = Polls;
