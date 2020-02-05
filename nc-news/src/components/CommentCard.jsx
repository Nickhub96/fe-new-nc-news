import React from "react";
import * as api from "./api";
import ErrorPage from "./ErrorPage";

class CommentCard extends React.Component {
  state = {
    voteChange: 0,
    err: null
  };
  render() {
    const { data } = this.props;
    const { err } = this.state;

    if (err) return <ErrorPage err={err} />;

    return (
      <li>
        <br />
        {data.body}
        <button
          onClick={() => {
            api.deleteComment(data.comment_id);
          }}
        >
          Delete Comment
        </button>
        <button
          onClick={() => {
            this.handleClick(1);
          }}
        >
          UpVote
        </button>
        <p>{data.votes} </p>

        <button
          onClick={() => {
            this.handleClick(-1);
          }}
        >
          DownVote
        </button>
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
