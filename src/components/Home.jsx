import React from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

class Home extends React.Component {
  state = {
    articles: [],
    err: null,
    loggedIn: false
  };

  render() {
    const { user } = this.props;
    const { err, loggedIn, articles } = this.state;

    if (err) return <ErrorPage err={err} />;
    else if (articles.length === 0) return <Loading />;
    return (
      <div>
        <button
          className="loginbutton"
          onClick={() => {
            this.handleLogin();
          }}
        >
          {loggedIn ? `logged in as ${user}` : `log in as ${user}`}
        </button>
        <form className="homeForm">
          <label>
            {" "}
            Sort by:
            <select
              onChange={event => {
                this.handleClick(event);
              }}
            >
              <option value="created_at">Date</option>
              <option value="comment_count">Comments</option>
              <option value="votes">Votes</option>
            </select>
          </label>
        </form>
        <ul>
          {articles.map(article => {
            return (
              <ArticleCard
                loggedIn={loggedIn}
                user={user}
                key={article.article_id}
                data={article}
              />
            );
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

  handleLogin = () => {
    const { loggedIn } = this.state;
    this.setState({ loggedIn: true || !loggedIn });
  };

  // handleLogin = () => {
  //   const { loggedIn } = this.props;
  //   this.setState({ loggedIn: !loggedIn });
  // };

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
