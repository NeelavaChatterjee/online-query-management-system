import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Question = props => (
    <tr>
        <td><Link to={"/question/"+props.question._id}>{props.question.query}</Link></td>
        <td>
            <Link to={"/question/edit/"+props.question._id}>edit</Link> | <a href="#" onClick={() => { props.deleteQuestion(props.question._id) }}>delete</a>
        </td>
    </tr>
)

export default class QuestionsList extends Component {
    constructor(props) {
        super(props);

        this.deleteQuestion = this.deleteQuestion.bind(this);

        this.state = {questions: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/queries/')
            .then(response => {
                this.setState({questions: response.data});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // FIXME: the page doesn't go back after deleting the question but throws an error instead
    deleteQuestion(id) {
        axios.delete('http://localhost:5000/queries/' + id)
            .then(res => console.log(res.data));

        this.setState({
            questions: this.state.questions.filter(el => el._id !== id)
        });

        window.location = '/';
    }

    questionList() {
        return this.state.questions.map(currentQuestion => {
            return <Question question={currentQuestion} deleteQuestion={this.deleteQuestion} key={currentQuestion._id}/>;
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Questions</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Question</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.questionList() }
                    </tbody>
                </table>
            </div>
        )
    }
}