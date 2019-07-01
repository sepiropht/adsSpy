import React, { useState } from 'react';
import Response from './response';

export default function Question(props) {

  const question = props.question;
  const choices = props.choices;
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(props.score);

  function onChoiceClick(correct) {
    const newScore = correct ? score + 1 : score;

    if (!answered) {
      props.updateScore(newScore);
      setAnswered(true);
      setScore(newScore);
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
