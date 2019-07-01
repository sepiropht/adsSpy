import React, { useState, useContext } from 'react';
import Response from './response';
import Context from './context';

export default function Question(props) {
  const question = props.question;
  const choices = props.choices;
  const [answered, setAnswered] = useState(false);
  //const [score, setScore] = useState(props.score);

  const { dispatch, state } = useContext(Context);

  function onChoiceClick(correct) {
    const newScore = correct ? state.score + 1 : state.score;

    if (!answered) {
      //props.updateScore(newScore);
      dispatch({ payload: newScore, type: 'UPDATE_SCORE' });
      setAnswered(true);
      dispatch({ type: 'NBRE_ANSWER' });
    }
  }

  const responses = (choices || []).map((choice, index) => {
    return (
      <Response
        title={choice.title}
        correct={choice.correct}
        key={index}
        answered={answered}
        onChoiceClick={onChoiceClick}
      />
    );
  });

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: props.id + 1 + ' - ' + question }}
      />
      <ul>{responses}</ul>
    </div>
  );
}
