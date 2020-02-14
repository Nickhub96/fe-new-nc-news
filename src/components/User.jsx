import React from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import ArticleCard from "./ArticleCard";
import Loading from "./Loading";

class User extends React.Component {
  state = {
    articles: [],
    user: [],
    loggedIn: false,
    err: null
  };

  render() {
    const { username } = this.props;
    const { user, articles, err, loggedIn } = this.state;
    if (err) return <ErrorPage err={err} />;
    else if (user.length === 0) return <Loading />;
    return (
      <div>
        <h2 className="userHeader">Your on {username}'s' page</h2>
        <img className="userImg" src={user.avatar_url} alt="user profile pic" />
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

  componentDidMount() {
    this.fetchArticles();
    this.fetchUser();
  }

  fetchUser = () => {
    const { username } = this.props;
    api
      .getUser(username)
      .then(user => {
        this.setState({ user: user });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };

  fetchArticles = () => {
    const { username } = this.props;
    api
      .getArticles(null, null, username)
      .then(articles => {
        this.setState({ articles: articles });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };
}

export default User;
