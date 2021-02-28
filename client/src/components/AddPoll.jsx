import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

export default () => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmitHandler = e => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/polls', { question, option1, option2, option3, option4 })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        const errorResponse = error.response.data.errors;
        const errorList = [];
        console.log(errorResponse);

        for (const key of Object.keys(errorResponse)) {
          errorList.push(errorResponse[key].message);
        }
        setErrors(errorList);
      });
  };

  useEffect(() => {
    document.title = 'Add Poll';
  }, []);

  return (
    <>
      <div className="text-right mb-4">
        <Link to="/" className="btn btn-primary px-4 py-2">
          back to home
        </Link>
      </div>
      <form onSubmit={onSubmitHandler} className="bg-light-gray p-4">
        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((error, idx) => (
              <div className="alert alert-danger" role="alert" key={idx}>
                {error}
              </div>
            ))}
          </div>
        )}
        <div className="row">
          <div className="form-group col-lg">
            <label htmlFor="question">
              Your question: <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control h-50 mb-5"
              id="question"
              onChange={e => setQuestion(e.target.value)}
            ></textarea>
            <button type="submit" className="btn btn-success w-100 my-4 px-4 py-2">
              Submit Poll
            </button>
            <div className="text-danger">* Indicates a required field</div>
          </div>
          <div className="col-lg">
            <div className="form-group">
              <label htmlFor="option1">
                Option 1: <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="option1"
                onChange={e => setOption1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="option2">
                Option 2: <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="option2"
                onChange={e => setOption2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="option3">Option 3:</label>
              <input
                type="text"
                className="form-control"
                id="option3"
                onChange={e => setOption3(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="option4">Option 4:</label>
              <input
                type="text"
                className="form-control"
                id="option4"
                onChange={e => setOption4(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
