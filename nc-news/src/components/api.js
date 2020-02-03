import axios from "axios";

export const getArticles = () => {
  return axios
    .get(`https://be-server-project.herokuapp.com/api/articles`)
    .then(({ data }) => {
      return data.articles;
    });
};

export const patchArticles = () => {};

export const getArticleById = article_id => {
  return axios
    .get(`https://be-server-project.herokuapp.com/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getComments = article_id => {
  return axios
    .get(
      `https://be-server-project.herokuapp.com/api/articles/${article_id}/comments`
    )
    .then(({ data }) => {
      console.log(data.comments);
      return data.comments;
    });
};

export const postComment = (article_id, comment) => {
  axios
    .post(
      `https://be-server-project.herokuapp.com/api/articles/${article_id}/comments`
    )
    .send({ body: comment });
};
