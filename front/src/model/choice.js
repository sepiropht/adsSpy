/*
 * Object 'Choice' to represent a choice
 *
 * A choice has two attributes
 *  - title : the title (name) of the choice
 *  - correct : boolean attribute to tell if the current choice is the correct answer
 */
export default class Choice {
    constructor(title, correct) {
        this.title = title;
        this.correct = correct;
    }
}
