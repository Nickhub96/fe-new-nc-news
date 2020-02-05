import React from "react";
import * as api from "./api";
import ErrorPage from "./ErrorPage";

class TopicContent extends React.Component {
  state = {
    articles: [],
    err: null
  };

  render() {
    const { err, articles } = this.state;
    const { slug } = this.props;
    if (err) return <ErrorPage err={err} />;
    else if (articles.length === 0) return <h4>Loading...</h4>;
    return <h2>Welcome to {slug}</h2>;
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    api
      .getArticles(this.props.slug)
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };
}
export default TopicContent;
