import React from "react";
import { Link } from "@reach/router";
import Loading from "./Loading";

const TopicCard = props => {
  const { topic } = props;
  if (topic.length === 0) return <Loading />;
  return (
    <li className="individualTopic">
      <Link to={`/topics/${topic.slug}`}>{topic.slug.toUpperCase()}</Link>
      <br />
      <br />
      {topic.description}
    </li>
  );
};

export default TopicCard;
