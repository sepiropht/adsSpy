import React from 'react';
import Question from './question';
import choice from '../model/choice';
import TestRenderer from 'react-test-renderer';

describe(' `Question` component ', () => {
    test('renders the view correctly', () => {
        // Given
        const fakeChoices = [
            new choice('choix 1', true),
            new choice('choix 2', false)
        ];

        // When
        const testRenderer = TestRenderer.create(
            <Question
                question={"What's the question ?"}
                choices={fakeChoices}
                score={0}/>
        );

        // Then
        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    test('should update state', () => {
        // Given
        const fakeChoices = [
            new choice('choix 1', true),
            new choice('choix 2', false)
        ];

        // When
        const testRenderer = TestRenderer.create(
            <Question
                question={"What's the question ?"}
                choices={fakeChoices}
                score={0}
                id={0}/>);

        // Then
        expect(testRenderer).not.toBeUndefined();

        let instance = testRenderer.getInstance();
        expect(instance.state.question).toEqual('What\'s the question ?');
        expect(instance.state.answered).toBeFalsy();
        expect(instance.state.choices).toHaveLength(2);
        expect(instance.state.choices[0].title).toEqual('choix 1');
        expect(instance.state.choices[0].correct).toBeTruthy();
        expect(instance.state.choices[1].title).toEqual('choix 2');
        expect(instance.state.choices[1].correct).toBeFalsy();
    });
});
