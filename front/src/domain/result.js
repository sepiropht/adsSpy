import React from 'react';


export default function Result({score, complete}) {

    const getScoreLabel = 'Votre score : ' + score + ' ' + (score > 1 ? 'bonnes réponses' : 'bonne réponse');

    return (
        <div className="result">
            {!!complete && <hr/>}
            {!!complete && getScoreLabel}
            {!!complete && <p><a href="/">Get another quiz !</a></p>}
        </div>
    );
}