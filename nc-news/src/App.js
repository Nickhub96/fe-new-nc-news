import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Article from "./components/Article";
import Topics from "./components/Topics";
import TopicContent from "./components/TopicContent";
import User from "./components/User";
import ErrorPage from "./components/ErrorPage";

class App extends React.Component {
  state = { user: "jessjelly", loggedIn: false };
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} loggedIn={this.state.loggedIn} />
        <NavBar user={this.state.user} loggedIn={this.state.loggedIn} />
        <Router className="route">
          <Home
            path="/"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <Article
            path="/article/:article_id"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <Topics
            path="/topics"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <TopicContent
            path="/topics/:slug"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <User
            path="/users/:username"
            user={this.state.user}
            loggedIn={this.state.loggedIn}
          />
          <ErrorPage default />
        </Router>
      </div>
    );
  }
}

export default App;
