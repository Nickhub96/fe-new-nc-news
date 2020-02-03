import React from "react";

const ArticleCard = props => {
  const { data } = props;
  return (
    <li>
      {" "}
      <br />
      <div>{data.title}</div>
      <div>{data.body}</div>
      <button>Vote</button>
    </li>
  );
};

export default ArticleCard;
