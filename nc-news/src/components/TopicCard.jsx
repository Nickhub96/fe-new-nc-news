import React from "react";
import { Link } from "@reach/router";

class TopicCard extends React.Component {
  state = {};
  render() {
    const { topic } = this.props;
    // console.log(topic.slug);
    return (
      <li className="topiccard">
        <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
        <br />
        {topic.description}
      </li>
    );
  }
}

export default TopicCard;
