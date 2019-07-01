import React from 'react';
/*
 * Response component
 */
export default function Response(props) {
  const title = props.title;
  const correct = props.correct;

  /*
   * Action to choice current response and prevent parent for this choice
   */
  function onChoiceClick() {
    props.onChoiceClick(correct);
  }

  function redGreenStyleButton(correct, answered) {
    const greenButton = {
      backgroundColor: 'green'
    };
    const redButton = {
      backgroundColor: 'red'
    };

    if (answered) {
      return correct ? greenButton : redButton;
    }
  }

  return (
    <li>
      <button
        style={redGreenStyleButton(correct, props.answered)}
        onClick={onChoiceClick}>
        <div dangerouslySetInnerHTML={{ __html: title }} />
      </button>
      {!!props.answered && (
        <div>{correct ? 'Bonne réponse' : 'Mauvaise réponse'}</div>
      )}
    </li>
  );
}
