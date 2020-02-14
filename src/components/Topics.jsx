import React from "react";
import * as api from "../api";
import TopicCard from "./TopicCard";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

class Topics extends React.Component {
  state = { topics: [], err: null };
  render() {
    const { err, topics } = this.state;

    if (err) return <ErrorPage err={err} />;
    else if (topics.length === 0) return <Loading />;
    return (
      <div className="topicPage">
        <h2 className="topicHeader">Topics</h2>
        <br />
        <ul className="topiccard">
          {topics.map(topic => {
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
