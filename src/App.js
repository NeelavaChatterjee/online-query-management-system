import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import QuestionsList from "./components/questions-list.component";
import AskQuestion from "./components/ask-question.component";
import EditQuestion from "./components/edit-question.component";
import QuestionAnswer from "./components/question-answer.component";
import GiveAnswer from "./components/give-answer.component";
import EditAnswer from "./components/edit-answer.component";

function App() {
  return (
      <Router>
          <Navbar />
          <br/>
          <Route path="/" exact component={QuestionsList} />
          <Route path="/question/ask" exact component={AskQuestion} />
          <Route path="/question/edit/:id" exact component={EditQuestion} />
          <Route path="/question/:id" exact component={QuestionAnswer} />
          <Route path="/answer/give/:id" exact component={GiveAnswer} />
          <Route path="/answer/edit/:id" exact component={EditAnswer} />
      </Router>
  );
}

export default App;
