import React from "react";
import { Link } from "@reach/router";

const TopicCard = props => {
  const { topic } = props;
  // console.log(topic.slug);
  return (
    <li className="individualTopic">
      <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
      <br />
      <br />
      {topic.description}
    </li>
  );
};

export default TopicCard;
