import React from "react";
import * as api from "./api";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";

class Topics extends React.Component {
  state = { topics: [] };
  render() {
    const { err } = this.state;
    console.log(err);
    if (err) return <ErrorPage err={err} />;
    else if (this.state.topics.length === 0) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>Hello in Topics</h2>
        <ul>
          {this.state.topics.map(topic => {
            return <TopicCard key={topic.slug} topic={topic} />;
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    api
      .getTopics()
      .then(topics => {
        this.setState({ topics: topics });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };
}
export default Topics;
