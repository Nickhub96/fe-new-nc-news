import React from "react";
import * as api from "./api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";

class Home extends React.Component {
  state = {
    articles: [],
    err: null
  };

  render() {
    const { err } = this.state;
    console.log(err);
    if (err) return <ErrorPage err={err} />;
    else if (this.state.articles.length === 0) return <h4>Loading...</h4>;
    return (
      <div>
        <form>
          <select
            onChange={event => {
              this.handleClick(event);
            }}
          >
            Sort by
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </form>
        <ul>
          {this.state.articles.map(article => {
            return <ArticleCard key={article.article_id} data={article} />;
          })}
        </ul>
      </div>
    );
  }

  handleClick = event => {
    const { value } = event.target;
    api
      .getArticles(null, value)
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };

  // componentDidUpdate(prevProp, prevState) {
  //   if (this.state.articles !== prevState.articles) {

  //   }
  // }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    // const { genre } = props.genre;
    api
      .getArticles(/*genre*/)
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };
}
export default Home;
