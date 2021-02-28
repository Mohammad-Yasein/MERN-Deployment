import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from '@reach/router';
import pie from '../imgs/pie.svg';
export default () => {
  const [polls, setPolls] = useState([]);
  const [topPolls, setTopPolls] = useState([]);

  useEffect(() => {
    document.title = 'Polls Page';

    axios
      .get('http://localhost:8000/api/polls')
      .then(response => {
        setPolls(response.data);
        setTopPolls(
          response.data
            .sort((a, b) => {
              const first = a.votes.length;
              const second = b.votes.length;
              return first < second ? 1 : first > second ? -1 : 0;
            })
            .slice(0, 3)
        );
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, []);

  return (
    <>
      <div className="text-right">
        <Link to="/polls/new" className="btn btn-primary mb-4 px-4 py-2">
          create your own poll
        </Link>
      </div>
      <div className="row">
        <div className="col-lg bg-light-gray mx-2 p-4">
          <h3>Top 3 Polls</h3>
          {topPolls.length > 0 &&
            topPolls.map((poll, idx) => {
              return (
                <div className="row border border-dark rounded bg-light mb-4" key={idx}>
                  <div className="col-2 p-2">
                    <img src={pie} alt="pie" />
                  </div>
                  <div className="col-10">
                    <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
                    <div>
                      <span className="mr-2">
                        {poll.option1}: {poll.votes.filter(vote => vote == poll.option1).length} votes
                      </span>
                      <span className="mr-2">
                        {poll.option2}: {poll.votes.filter(vote => vote == poll.option2).length} votes
                      </span>
                      {poll.option3 && (
                        <span className="mr-2">
                          {poll.option3}: {poll.votes.filter(vote => vote == poll.option3).length} votes
                        </span>
                      )}
                      {poll.option4 && (
                        <span>
                          {poll.option4}: {poll.votes.filter(vote => vote == poll.option4).length} votes
                        </span>
                      )}
                    </div>
                    <div>({moment(poll.createdAt).fromNow()})</div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-lg bg-light-gray mx-2 p-4">
          <h3>Recent Polls</h3>
          {polls.length > 0 &&
            polls
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              .map((poll, idx) => {
                return (
                  <div className="row border border-dark rounded bg-light mb-4" key={idx}>
                    <div className="col-2 p-2">
                      <img src={pie} alt="pie" />
                    </div>
                    <div className="col-10">
                      <Link to={`/polls/${poll._id}`}>{poll.question}</Link>
                      <div>
                        <span className="mr-2">
                          {poll.option1}: {poll.votes.filter(vote => vote == poll.option1).length} votes
                        </span>
                        <span className="mr-2">
                          {poll.option2}: {poll.votes.filter(vote => vote == poll.option2).length} votes
                        </span>
                        {poll.option3 && (
                          <span className="mr-2">
                            {poll.option3}: {poll.votes.filter(vote => vote == poll.option3).length} votes
                          </span>
                        )}
                        {poll.option4 && (
                          <span>
                            {poll.option4}: {poll.votes.filter(vote => vote == poll.option4).length} votes
                          </span>
                        )}
                      </div>
                      <div>({moment(poll.createdAt).fromNow()})</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
