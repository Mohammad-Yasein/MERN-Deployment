import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

export default props => {
  const [poll, setPoll] = useState({});
  const [isVoted, setIsVoted] = useState(false);

  const onClickHandler = e => {
    axios
      .put(`http://localhost:8000/api/polls/${props.id}`, {
        ...poll,
        votes: [...poll.votes, e.target.value],
      })
      .then(response => {
        setIsVoted(true);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    document.title = 'Poll Vote';

    axios
      .get(`http://localhost:8000/api/polls/${props.id}`)
      .then(response => {
        setPoll(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  return isVoted ? (
    <div>
      <div className="text-right mb-4">
        <Link to="/" className="btn btn-primary px-4 py-2">
          back to home
        </Link>
      </div>
      <div className="bg-light-gray p-4">
        <div className="alert alert-success mb-5" role="alert">
          Thanks for voting! Here are the results..
        </div>
        <h3>{poll.question}</h3>
        <p>
          <span className="mr-5">{poll.option1}</span>
          {poll.votes.filter(vote => vote == poll.option1).length} votes
        </p>
        <p>
          <span className="mr-5">{poll.option2}</span>
          {poll.votes.filter(vote => vote == poll.option2).length} votes
        </p>
        {poll.option3 && (
          <p>
            <span className="mr-5">{poll.option3}</span>
            {poll.votes.filter(vote => vote == poll.option3).length} votes
          </p>
        )}
        {poll.option4 && (
          <p>
            <span className="mr-5">{poll.option4}</span>
            {poll.votes.filter(vote => vote == poll.option4).length} votes
          </p>
        )}
      </div>
    </div>
  ) : (
    <div className="bg-light-gray text-center p-4">
      <h3 className="mb-5">{poll.question}</h3>
      <div className="d-inline-block border border-dark rounded bg-light text-center mx-4 py-2 px-5">
        <h5 className="mb-5">{poll.option1}</h5>
        <button
          type="button"
          className="btn btn-warning"
          value={poll.option1}
          onClick={e => onClickHandler(e)}
        >
          Vote {poll.option1}
        </button>
      </div>
      <div className="d-inline-block border border-dark rounded bg-light text-center mx-4 py-2 px-5">
        <h5 className="mb-5">{poll.option2}</h5>
        <button
          type="button"
          value={poll.option2}
          className="btn btn-danger"
          onClick={e => onClickHandler(e)}
        >
          Vote {poll.option2}
        </button>
      </div>
      {poll.option3 && (
        <div className="d-inline-block border border-dark rounded bg-light text-center mx-4 py-2 px-5">
          <h5 className="mb-5">{poll.option3}</h5>
          <button
            type="button"
            value={poll.option3}
            className="btn btn-success"
            onClick={e => onClickHandler(e)}
          >
            Vote {poll.option3}
          </button>
        </div>
      )}
      {poll.option4 && (
        <div className="d-inline-block border border-dark rounded bg-light text-center mx-4 py-2 px-5">
          <h5 className="mb-5">{poll.option4}</h5>
          <button
            type="button"
            value={poll.option4}
            className="btn btn-info"
            onClick={e => onClickHandler(e)}
          >
            Vote {poll.option4}
          </button>
        </div>
      )}
    </div>
  );
};
