import React, { Component } from "react";
import axios from 'axios';

const Answer = props => (
    <div className="border m-2 p-2">
        <div className="row m-0">
            <p>{props.answer.answer}</p>
        </div>
        <div className="row">
            <button className="btn btn-outline-primary m-2" onClick={() => {window.location = "/answer/edit/" + props.answer._id}} type="button">Edit</button>
            <button className="btn btn-outline-danger m-2" onClick={() => {props.deleteAnswer(props.answer._id)}} type="button">Delete</button>
        </div>
    </div>
)

export default class QuestionAnswer extends Component {
    constructor(props) {
        super(props);

        this.deleteAnswer = this.deleteAnswer.bind(this);

        this.state = {
            question: '',
            answers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/queries/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    question: res.data.query
                });
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://localhost:5000/answers/question/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    answers: res.data
                });
            })
    }

    deleteAnswer(id) {
        axios.delete('http://localhost:5000/answers/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            questions: this.state.answers.filter(el => el._id !== id)
        });

        window.location = '/question/' + this.props.match.params.id;
    }

    answerList() {
        return this.state.answers.map(currentAnswer => {
            return <Answer answer={currentAnswer} deleteAnswer={this.deleteAnswer} key={currentAnswer._id} />;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>{this.state.question}</h3>
                <button className="btn btn-primary mb-5" onClick={() => {window.location = "/answer/give/" + this.props.match.params.id}} type="button">Give an Answer</button>
                <div>
                    { this.answerList() }
                </div>
            </div>
        )
    }
}