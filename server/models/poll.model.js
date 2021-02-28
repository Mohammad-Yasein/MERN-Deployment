const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      index: true,
      unique: true,
      required: [true, 'QUESTION IS REQUIRED!'],
      minLength: [10, 'QUESTION MUST BE AT LEAST 10 CHARACTERS LONG!'],
    },
    option1: {
      type: String,
      required: [true, 'OPTION 1 IS REQUIRED!'],
    },
    option2: {
      type: String,
      required: [true, 'OPTION 2 IS REQUIRED!'],
    },
    option3: {
      type: String,
    },
    option4: {
      type: String,
    },
    votes: [String],
  },
  { timestamps: true }
);

PollSchema.plugin(uniqueValidator, { message: 'QUESTION IS IN USE! MUST BE UNIQUE!' });

module.exports = mongoose.model('Poll', PollSchema);
