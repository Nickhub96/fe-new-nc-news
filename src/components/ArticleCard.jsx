import React from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
class ArticleCard extends React.Component {
  state = {
    voteChange: 0,
    err: null
  };
  render() {
    const { data, loggedIn } = this.props;
    const { voteChange, err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (data.length === 0) return <Loading />;
    console.log(voteChange);
    return (
      <li className={`articletopic`}>
        <section className="headofCard">
          <p>{this.dateFormatter(data.created_at)}</p>
          <h2>
            <Link
              className={`titlelink`}
              to={`/article/${data.article_id}`}
              // `topics/coding/article:${data.article_id}`
            >
              {data.title}
            </Link>
          </h2>
          <Link className={`titlelink`} to={`/topics/${data.topic}`}>
            {data.topic.toUpperCase()}
          </Link>
        </section>{" "}
        <p>
          <Link className={`author${data.topic}`} to={`/users/${data.author}`}>
            {" "}
            written by{data.author}
          </Link>
        </p>
        <section className="commentCount">
          <p>{data.comment_count}</p>
          <img
            className="commentIcon"
            src="https://image.flaticon.com/icons/svg/1381/1381635.svg"
            alt="comment icon"
            height="22"
            width="22"
          />
        </section>
        <section className="articleVote">
          <button
            disabled={voteChange === 1}
            className
            onClick={() => {
              loggedIn && this.handleClick(1);
            }}
          >
            Like
          </button>
          <p>{data.votes + voteChange} </p>
          <button
            disabled={voteChange === -1}
            onClick={() => {
              loggedIn && this.handleClick(-1);
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

  dateFormatter = date => {
    const yymmdd = date.slice(0, 10);
    const time = date.slice(11, 16);
    const newDate = yymmdd + " " + time;
    return newDate;
  };
}

export default ArticleCard;
