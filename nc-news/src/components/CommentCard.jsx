import React from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import Voter from "./Voter";

class CommentCard extends React.Component {
  state = {
    voteChange: 0,
    err: null
  };
  render() {
    const { data, user, loggedIn } = this.props;
    const { err } = this.state;

    if (err) return <ErrorPage err={err} />;

    return (
      <li className="commentCard">
        <br />
        <p>{data.author}</p>
        <br />
        <p>{data.body}</p>
        <button
          onClick={() => {
            if (user === data.author && loggedIn === true) {
              api.deleteComment(data.comment_id);
            }
          }}
        >
          Delete Comment
        </button>
        <section className="articleVote">
          <button
            onClick={() => {
              this.handleClick(1);
            }}
          >
            Like
          </button>
          <p>{data.votes} </p>

          <button
            onClick={() => {
              this.handleClick(-1);
            }}
          >
            Dislike
          </button>
        </section>
        {/* <Voter handleClick={this.handleClick} data={data} /> */}
      </li>
    );
  }

  handleClick = voteDifference => {
    const { comment_id } = this.props.data;
    this.setState(currentState => {
      return { voteChange: currentState.voteChange + voteDifference };
    });
    api.incVote(comment_id, voteDifference).catch(err => {
      this.setState(currentState => {
        return {
          err: err.response,
          voteChange: currentState.voteChange - voteDifference
        };
      });
    });
  };
}

export default CommentCard;
