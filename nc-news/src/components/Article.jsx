import React from "react";
import * as api from "./api";
import CommentCard from "./CommentCard";
import ErrorPage from "./ErrorPage";
import { Button } from "antd";

class Article extends React.Component {
  state = {
    article: [],
    comments: [],
    comment: "",
    err: null
  };
  render() {
    const { err } = this.state;
    if (err) return <ErrorPage err={err} />;
    else if (this.state.article.length === 0)
      return <Button>Loading...</Button>;
    return (
      <section>
        <h2> {this.state.article.title}</h2>
        <br />
        <p className="articleBody">{this.state.article.body}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Post a Comment
            <input
              required
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.handleInput}
            />
          </label>
          <button type="submit">Post</button>
        </form>
        <ul>
          {this.state.comments.map(comment => {
            return (
              <CommentCard key={comment.comment_id || null} data={comment} />
            );
          })}
        </ul>
      </section>
    );
  }

  handleInput = event => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    const { article_id } = this.props;
    const { comment } = this.state;
    event.preventDefault();
    api.postComment(article_id, comment);
    this.setState(currentState => {
      return { comments: [...currentState.comments, currentState.comment] };
    });
    this.setState({ comment: "" });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments !== prevState.comments) {
      this.fetchArticleById();
      this.fetchComments();
    }
  }

  componentDidMount() {
    this.fetchArticleById();
    this.fetchComments();
  }

  fetchArticleById = () => {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then(article => {
        this.setState({
          article: article
        });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api
      .getComments(article_id)
      .then(comments => {
        this.setState({ comments: comments });
      })
      .catch(err => {
        this.setState({ err: err.response });
      });
  };
}

export default Article;
