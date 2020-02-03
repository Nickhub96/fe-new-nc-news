import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Home from "./components/Home";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Article from "./components/Article";

class App extends React.Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header />
        <NavBar />
        <Router>
          <Home path="/" />
          <Article path="article/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
