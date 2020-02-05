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

class App extends React.Component {
  state = { author: "jessjelly" };
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router>
          <Home path="/" />
          <Article path="/article/:article_id" />
          <Topics path="/topics" />
          <TopicContent path="/topics/:slug" />
          <User path="/users/:username" />
        </Router>
      </div>
    );
  }
}

export default App;
