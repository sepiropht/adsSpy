import React, { useState, useEffect, useReducer } from 'react';
import shuffle from 'lodash/shuffle';
import Question from './question';
import Result from './result';
import Choice from '../model/choice';
import Context from './context';

// QUIZ API URL
const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';

const initState = {
  score: 0,
  nbrOfAnswers: 0,
  quiz: [],
  isLoaded: false,
  error: null,
  next: [1]
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
    case 'QUIZ_LOADED':
      return {
        ...state,
        quiz: action.payload
      };
    case 'LOADING_FINISH':
      return {
        ...state,
        isLoaded: true
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'RELOADING':
      return {
        ...state,
        next: [Math.random()]
      };
    case 'SET_QUIZ':
      return {
        ...state,
        quiz: action.payload
      };
    case 'INIT':
    default:
      return initState;
  }
};

function Quiz() {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({ type: 'INIT' });
    fetch(API_URL)
      .then(result => result.json())
      .then(
        json => {
          dispatch({ type: 'LOADING_FINISH' });
          dispatch({ type: 'SET_QUIZ', payload: json.results });
        },
        // handle errors here
        error => {
          dispatch({ type: 'LOADING_FINISH' });
          dispatch({ type: 'SET_ERROR', payload: error });
        }
      );
  }, state.next);

  function createChoices(question) {
    return shuffle([
      new Choice(question.correct_answer, true),
      ...question.incorrect_answers.map(value => new Choice(value, false))
    ]);
  }

  const questions = state.quiz.map((question, index) => {
    return (
      <Question
        question={question.question}
        choices={createChoices(question)}
        score={state.score}
        key={index}
        id={index}
      />
    );
  });

  if (state.error) {
    return <div>Error: {state.error.message}</div>;
  } else if (!state.isLoaded) {
    return <div>Loading quiz...</div>;
  } else {
    return (
      <Context.Provider value={{ dispatch, state }}>
        <div>
          {questions}
          <Result/>
        </div>
      </Context.Provider>
    );
  }
}

export default Quiz;
