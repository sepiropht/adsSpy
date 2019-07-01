import React from 'react';

/*
 * Response component
 */
export default class Response extends React.Component {

    /*
     * Init state from props (Question component parent data)
     *
     * The state 'Response' is composed by :
     *  - title : the title of the response
     *  - correct : value to tell if this choice is correct or not
     */
    constructor() {
        super(...arguments);
        this.state = {
            title: this.props.title,
            correct: this.props.correct,
        };
    }

    /*
     * Action to choice current response and prevent parent for this choice
     */
    onChoiceClick() {
        this.props.onChoiceClick(this.state.correct);
    }

    /*
     * Get clicked button style according to the state if the clicked response
     *  - green : if the question is answered and correct
     *  - red : if the question is answered and not correct
     */
    redGreenStyleButton(correct, answered) {
        const greenButton = {
            backgroundColor: 'green',
        };
        const redButton = {
            backgroundColor: 'red',
        };

        if (answered) {
            return correct ? greenButton : redButton;
        }
    }

    render() {
        const {title, correct} = this.state;

        return (
            <li>
                <button style={this.redGreenStyleButton(correct, this.props.answered)}
                        onClick={this.onChoiceClick.bind(this)}>
                    <div dangerouslySetInnerHTML={{__html: title}}/>
                </button>
                {!!this.props.answered &&
                <div>{correct ? 'Bonne réponse' : 'Mauvaise réponse'}</div>
                }
            </li>
        );
    };
}
