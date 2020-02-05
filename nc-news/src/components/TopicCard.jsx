import React from "react";
import { Link } from "@reach/router";

class TopicCard extends React.Component {
  state = {};
  render() {
    const { topic } = this.props;
    return (
      <li>
        <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>

        {topic.description}
      </li>
    );
  }
}

export default TopicCard;
