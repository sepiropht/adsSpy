import React from 'react';
import Result from './result';
import TestRenderer from 'react-test-renderer';

describe(' `Result` component ', () => {
    test('renders the view correctly', () => {
        // When
        const rendered = TestRenderer.create(
            <Result score={4} complete={false}/>
        );

        // Then
        expect(rendered.toJSON()).toMatchSnapshot();
    });

    test('displays score message when quiz is done and `5` correct answers', () => {
        // When
        const testRenderer = TestRenderer.create(
            <Result score={5} complete={true}/>
        );

        // Then
        expect(testRenderer).not.toBeUndefined();
        expect(testRenderer.toJSON()['children']).toContain('Votre score : 5 bonnes réponses');
    });

    test('displays score message when quiz is done and `1` correct answer', () => {
        // When
        const testRenderer = TestRenderer.create(
            <Result score={1} complete={true}/>
        );

        // Then
        expect(testRenderer).not.toBeUndefined();
        expect(testRenderer.toJSON()['children']).toContain('Votre score : 1 bonne réponse');
    });

    test('displays score message when quiz is done and `0` correct answer', () => {
        // When
        const testRenderer = TestRenderer.create(
            <Result score={0} complete={true}/>
        );

        // Then
        expect(testRenderer).not.toBeUndefined();
        expect(testRenderer.toJSON()['children']).toContain('Votre score : 0 bonne réponse');
    });

    test('not display message score when quiz is not yet done', () => {
        // When
        const testRenderer = TestRenderer.create(
            <Result score={3} complete={false}/>
        );

        // Then
        expect(testRenderer.toJSON()['children']).toBeNull();
    });
});
