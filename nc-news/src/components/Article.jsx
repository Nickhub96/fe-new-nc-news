import React from "react";
import * as api from "./api";
import CommentCard from "./CommentCard";

class Article extends React.Component {
  state = {
    article: [],
    comments: [],
    comment: ""
  };
  render() {
    // console.log(this.state.comments);
    return (
      <div>
        {this.state.article.title}
        <br />
        {this.state.article.body}
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Post a Comment
            <input
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
      </div>
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
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments !== prevState.comments) {
      this.fetchArticleById();
      this.fetchComments();
      this.setState({ comment: "" });
    }
  }

  componentDidMount() {
    this.fetchArticleById();
    this.fetchComments();
  }

  fetchArticleById = () => {
    const { article_id } = this.props;
    api.getArticleById(article_id).then(article => {
      this.setState({
        article: article
      }); /*.catch(err => {
        this.SetState({ err: err });*/
      // });
    });
  };

  fetchComments = () => {
    const { article_id } = this.props;
    api.getComments(article_id).then(comments => {
      this.setState({ comments: comments });
    });
  };
}

export default Article;
