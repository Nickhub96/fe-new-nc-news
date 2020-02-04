import React from "react";
import * as api from "./api";

const CommentCard = props => {
  const { data } = props;
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
    </li>
  );
};

export default CommentCard;
