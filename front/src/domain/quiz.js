import React from 'react';
import shuffle from 'lodash/shuffle';
import Question from './question';
import Result from './result';
import Choice from '../model/choice';

// QUIZ API URL
const API_URL = "https://opentdb.com/api.php?amount=5&type=multiple";

export default class Quiz extends React.Component {

    constructor() {
        super();
        this.state = {
            quiz: [],
            isLoaded: false,
            error: null,
            nbrOfAnswers: 0,
            score: 0
        }
    }

    componentDidMount() {
        fetch(API_URL)
            .then(result => result.json())
            .then(
                (json) => {
                    this.setState({
                        isLoaded: true,
                        quiz: json.results
                    });
                },
                // handle errors here
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }


    updateScore(newScore) {
        this.setState((state) => ({
            score: (state.score + newScore),
            nbrOfAnswers: (state.nbrOfAnswers + 1)
        }));
    }


    createChoices(question) {

        return shuffle(
            [new Choice(question.correct_answer, true),
                ...question.incorrect_answers.map((value) => new Choice(value, false))]);
    }

    render() {
        const {quiz, score, nbrOfAnswers, isLoaded, error} = this.state;


        const questions = quiz.map(
            (question, index) => {
                return <Question
                    question={question.question}
                    choices={this.createChoices(question)}
                    score={score}
                    key={index}
                    id={index}
                    updateScore={this.updateScore.bind(this)}
                />
            });


        if (error) {
            return <div>Error: {error.message}</div>;
        } 
        else if (!isLoaded) {
            return <div>Loading quiz...</div>;
        } else {
            return (
                <div>
                    {questions}

                    <Result score={score} complete={quiz.length === nbrOfAnswers}/>
                </div>
            );
        }
    }
}
