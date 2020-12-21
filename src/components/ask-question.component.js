import React, { Component} from "react";
import axios from "axios";

export default class AskQuestion extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuery = this.onChangeQuery.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            query: ''
        }
    }

    onChangeQuery(e) {
        this.setState({
            query: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const question = {
            query: this.state.query,
        };

        console.log(question);

        axios.post('http://localhost:5000/queries/add', question)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="container">
                <h3>Ask Question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input  type="text"
                                required
                                className="form-control"
                                value={this.state.query}
                                onChange={this.onChangeQuery}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Ask a Question" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}