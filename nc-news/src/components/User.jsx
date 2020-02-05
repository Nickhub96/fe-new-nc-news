import React from "react";
import * as api from "./api";
import ErrorPage from "./ErrorPage";

class User extends React.Component {
  state = {
    articles: [],
    user: [],
    err: null
  };

  render() {
    const { username } = this.props;
    const { user, articles, err } = this.state;
    if (err) return <ErrorPage err={err} />;
    else if (this.state.user.length === 0) return <h4>Loading...</h4>;
    return (
      <div>
        <h2>Your on {username}'s' page</h2>
        <img src={user.avatar_url} alt="user profile pic" />
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                {article.title}
                {article.author}
              </li>
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
