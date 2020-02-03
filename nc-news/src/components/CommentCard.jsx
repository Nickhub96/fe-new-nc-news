import React from "react";

const CommentCard = props => {
  const { data } = props;
  return (
    <li>
      <br />
      {data.body}
    </li>
  );
};

export default CommentCard;
