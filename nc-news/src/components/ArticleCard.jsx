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
      <li className="articleCard">
        <section className="headofCard">
          <p>{data.created_at}</p>
          <h2>
            <Link className="titlelink" to={`article/${data.article_id}`}>
              {data.title}
            </Link>
          </h2>
          <p>{data.topic}</p>
        </section>{" "}
        <p>
          <Link className="author" to={`users/${data.author}`}>
            {" "}
            written by{data.author}
          </Link>
        </p>
        <p>{data.comment_count} comments</p>
        <section className="articleVote">
          <button
            className
            onClick={() => {
              this.handleClick(1);
            }}
          >
            Like
          </button>
          <p>{data.votes + voteChange} </p>
          <button
            onClick={() => {
              this.handleClick(-1);
            }}
          >
            Dislike
          </button>
        </section>
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
