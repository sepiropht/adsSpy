import React, { useContext } from 'react';
import Context from './context';

export default function Result({quizLength}) {

    const { state } = useContext(Context);

    const getScoreLabel = 'Votre score : ' + state.score + ' ' + (state.score > 1 ? 'bonnes réponses' : 'bonne réponse');
    const complete = quizLength === state.nbrOfAnswers;

    console.log({complete})

    return (
        <div className="result">
            {!!complete && <hr/>}
            {!!complete && getScoreLabel}
            {!!complete && <p><a href="/">Get another quiz !</a></p>}
        </div>
    );
}