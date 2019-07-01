import React, { useState, useEffect } from 'react';
import shuffle from 'lodash/shuffle';
import Question from './question';
import Result from './result';
import Choice from '../model/choice';

// QUIZ API URL
const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';

function Quiz() {
  const [nbrOfAnswers, setAnswersNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [isLoaded, toggleLoading] = useState(false);
  const [error, setError] = useState(null);

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

  function updateScore(newScore) {
    setScore(score + newScore);
    setAnswersNumber(nbrOfAnswers + 1);
  }

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
        score={score}
        key={index}
        id={index}
        updateScore={updateScore}
      />
    );
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading quiz...</div>;
  } else {
    return (
      <div>
        {questions}
        <Result score={score} complete={quiz.length === nbrOfAnswers} />
      </div>
    );
  }
}

export default Quiz;
