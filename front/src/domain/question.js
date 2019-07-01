import React from 'react';
import Response from './response';

/*
 * Question component
 */
export default class Question extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            question: this.props.question,
            choices: this.props.choices,
            answered: false,
            score: this.props.score
        };
    }

 
    onChoiceClick(correct) {
        const newScore = correct ? this.state.score + 1 : this.state.score;

        if (!this.state.answered) {
            this.props.updateScore(newScore);
            this.setState({
                answered: true,
                score: newScore
            });
        }
    }

 
    render() {
        const {question, choices, answered} = this.state;

        const responses = choices.map(
            (choice, index) => {
                return <Response
                    title={choice.title}
                    correct={choice.correct}
                    key={index}
                    answered={answered}
                    onChoiceClick={this.onChoiceClick.bind(this)}
                />
            });

        return (
            <div>
                <div dangerouslySetInnerHTML={{__html: (this.props.id + 1) + ' - ' + question}}/>
                <ul>{responses}</ul>
            </div>

        );
    };
}
