const PollController = require('../controllers/poll.controller');

module.exports = app => {
  app.get('/api/polls', PollController.getAllPolls);
  app.post('/api/polls', PollController.createPoll);
  app.get('/api/polls/:id', PollController.getPollById);
  app.put('/api/polls/:id', PollController.updatePoll);
  app.delete('/api/polls/:id', PollController.deletePoll);
};
