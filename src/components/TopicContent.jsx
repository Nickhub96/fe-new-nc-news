import React from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

class TopicContent extends React.Component {
  state = {
    articles: [],
    err: null
  };

  render() {
    const { err, articles } = this.state;
    const { slug } = this.props;
    if (err) return <ErrorPage err={err} />;
    else if (articles.length === 0) return <Loading />;
    return (
      <section>
        <h2 className="topicPageTitle">{slug.toUpperCase()}</h2>
        <ul>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} data={article} />;
          })}
        </ul>
      </section>
    );
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
