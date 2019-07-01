import React, { useContext } from 'react';
import Context from './context';

export default function Result() {
  const { dispatch, state } = useContext(Context);

  const getScoreLabel =
    'Votre score : ' +
    state.score +
    ' ' +
    (state.score > 1 ? 'bonnes réponses' : 'bonne réponse');
  const complete = state.quiz.length === state.nbrOfAnswers;


  return (
    <div className="result">
      {!!complete && <hr />}
      {!!complete && getScoreLabel}
      {!!complete && (
        <p>
          <a href="#" onClick={() => dispatch({ type: 'RELOADING' })}>
            Get another quiz !
          </a>
        </p>
      )}
    </div>
  );
}
