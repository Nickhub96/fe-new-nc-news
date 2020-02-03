import axios from "axios";

export const getArticles = () => {
  return axios
    .get(`https://be-server-project.herokuapp.com/api/articles`)
    .then(({ data }) => {
      console.log(data.articles);
      return data.articles;
    });
};
