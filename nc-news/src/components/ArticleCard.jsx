import React from "react";
import { Link } from "@reach/router";

const ArticleCard = props => {
  const { data } = props;
  return (
    <li>
      {" "}
      <br />
      <Link to={`article/${data.article_id}`}>{data.title}</Link>
      <button>Vote</button>
    </li>
  );
};

export default ArticleCard;
