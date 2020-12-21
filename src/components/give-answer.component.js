import React, { Component} from "react";
import axios from "axios";

export default class GiveAnswer extends Component {
    constructor(props) {
        super(props);

        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            query: '',
            questionId: this.props.match.params.id,
            answer: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/queries/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    query: response.data.query
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeAnswer(e) {
        this.setState({
            answer: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const answer = {
            questionId: this.state.questionId,
            answer: this.state.answer,
        };

        console.log(answer);

        axios.post('http://localhost:5000/answers/', answer)
            .then(res => console.log(res.data));

        window.location = '/question/' + this.state.questionId;
    }

    render() {
        return (
            <div className="container">
                <p>Give an Answer for the following question:</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h4>{this.state.query}</h4>
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.answer}
                                onChange={this.onChangeAnswer}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Give an Answer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}