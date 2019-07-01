import React, { useState, useEffect, useReducer } from 'react';
import shuffle from 'lodash/shuffle';
import Question from './question';
import Result from './result';
import Choice from '../model/choice';
import Context from './context';

// QUIZ API URL
const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';
const init = {
  score: 0,
  nbrOfAnswers: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload
      };
    case 'NBRE_ANSWER': 
      return {
        ...state,
        nbrOfAnswers: state.nbrOfAnswers + 1
      };
    default: return state;
  }
};

function Quiz() {
  //const [nbrOfAnswers, setAnswersNumber] = useState(0);
  //const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [isLoaded, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, init);


  useEffect(() => {
    fetch(API_URL)
      .then(result => result.json())
      .then(
        json => {
          toggleLoading(true);
          setQuiz(json.results);
        },
        // handle errors here
        error => {
          toggleLoading(true);
          setError(error);
        }
      );
  }, []);

  // function updateScore(newScore) {
  //   setScore(score + newScore);
  //   setAnswersNumber(nbrOfAnswers + 1);
  // }

  function createChoices(question) {
    return shuffle([
      new Choice(question.correct_answer, true),
      ...question.incorrect_answers.map(value => new Choice(value, false))
    ]);
  }

  const questions = (quiz || []).map((question, index) => {
    return (
      <Question
        question={question.question}
        choices={createChoices(question)}
        score={state.score}
        key={index}
        id={index}
        //updateScore={updateScore}
      />
    );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading quiz...</div>;
  } else {
    return (
      <Context.Provider value={{dispatch, state}}>
        <div>
          {questions}
        <Result  quizLength={quiz.length} />
      </div>
      </Context.Provider>
    );
  }
}

export default Quiz;
