import React from 'react';
import { Router } from '@reach/router';

import PollsPage from './components/PollsPage';
import AddPoll from './components/AddPoll';
import PollVote from './components/PollVote';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
    <Router>
      <PollsPage path="/" />
      <AddPoll path="/polls/new" />
      <PollVote path="/polls/:id" />
    </Router>
  </>
);

export default App;
