import React from "react";
import * as api from "./api";
import ArticleCard from "./ArticleCard";

class Home extends React.Component {
  state = {
    articles: []
  };

  render() {
    console.log(this.state.articles);
    return (
      <ul>
        {this.state.articles.map(article => {
          return <ArticleCard key={article.article_id} data={article} />;
        })}
      </ul>
    );
  }

  // componentDidUpdate(prevProp) {
  //   if (this.state.articles !== prevProp.articles) {
  //     this.fetchArticle();
  //   }
  // }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    // const { genre } = props.genre;
    api.getArticles(/*genre*/).then(articles => {
      this.setState({ articles: articles });
    });
  };
}
export default Home;
