import React from "react";
import { Link } from "@reach/router";
import * as api from "./api";
import ErrorPage from "./ErrorPage";
class ArticleCard extends React.Component {
  state = {
    voteChange: 0,
    err: null
  };
  render() {
    const { data } = this.props;
    const { voteChange, err } = this.state;
    if (err) return <ErrorPage err={err} />;
    return (
      <li>
        {" "}
        <br />
        <Link to={`article/${data.article_id}`}>{data.title}</Link> {"  "}
        <Link to={`users/${data.author}`}> written by{data.author}</Link>
        <button
          onClick={() => {
            this.handleClick(1);
          }}
        >
          UpVote
        </button>
        <p>{data.votes + voteChange} </p>
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
    const { article_id } = this.props.data;
    this.setState(currentState => {
      return { voteChange: currentState.voteChange + voteDifference };
    });
    api.incVoteArt(article_id, voteDifference).catch(err => {
      this.setState(currentState => {
        return {
          err: err.response,
          voteChange: currentState.voteChange - voteDifference
        };
      });
    });
  };
}

export default ArticleCard;
