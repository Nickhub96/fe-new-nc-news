import React from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import { Link } from "@reach/router";
import Loading from "./Loading";

class CommentCard extends React.Component {
  state = {
    voteChange: 0,
    err: null
  };
  render() {
    const { data, user } = this.props;
    const { err, voteChange } = this.state;

    if (err) return <ErrorPage err={err} />;
    if (data.length === 0) return <Loading />;
    return (
      <li className="commentCard">
        <br />

        <Link className={"commentText"} to={`/users/${data.author}`}>
          {" "}
          {data.author}
        </Link>

        <br />
        <p className="commentText">{data.body}</p>
        <section className="deleteButton">
          <button
            onClick={() => {
              if (user === data.author) {
                api.deleteComment(data.comment_id);
              }
            }}
          >
            Delete
            <img
              src="https://img.icons8.com/material-outlined/24/000000/delete-trash.png"
              alt="rubbish icon"
              height="26"
              width="22"
            ></img>
          </button>
        </section>
        <section className="articleVote">
          <button
            disabled={voteChange === 1}
            onClick={() => {
              this.handleClick(1);
            }}
          >
            Like
          </button>
          <p className="commentText">{data.votes} </p>

          <button
            disabled={voteChange === -1}
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
