const Poll = require('../models/poll.model');

module.exports.createPoll = (request, response) => {
  Poll.create(request.body)
    .then(poll => response.json(poll))
    .catch(error => response.status(400).json(error));
};

module.exports.getAllPolls = (request, response) => {
  Poll.find()
    .then(polls => response.json(polls))
    .catch(error => response.status(400).json(error));
};

module.exports.getPollById = (request, response) => {
  Poll.findOne({ _id: request.params.id })
    .then(poll => response.json(poll))
    .catch(error => response.status(400).json(error));
};

module.exports.updatePoll = (request, response) => {
  Poll.findOneAndUpdate({ _id: request.params.id }, request.body)
    .then(poll => response.json(poll))
    .catch(error => response.status(400).json(error));
};

module.exports.deletePoll = (request, response) => {
  Poll.deleteOne({ _id: request.params.id })
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(error => response.status(400).json(error));
};
