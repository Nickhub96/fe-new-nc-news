import axios from "axios";

export const getArticles = (slug, value, username) => {
  return axios
    .get(`https://be-server-project.herokuapp.com/api/articles`, {
      params: { topic: slug, sort_by: value, author: username }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

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
      return data.comments;
    });
};

export const postComment = (article_id, comment) => {
  return axios
    .post(
      `https://be-server-project.herokuapp.com/api/articles/${article_id}/comments`,
      { body: comment, username: "jessjelly" }
    )
    .then(function(response) {});
};

export const deleteComment = comment_id => {
  return axios.delete(
    `https://be-server-project.herokuapp.com/api/comments/${comment_id}`
  );
};

export const incVote = (comment_id, voteDifference) => {
  return axios.patch(
    `https://be-server-project.herokuapp.com/api/comments/${comment_id}`,
    {
      inc_votes: voteDifference
    }
  );
};

export const incVoteArt = (article_id, voteDifference) => {
  return axios.patch(
    `http://be-server-project.herokuapp.com/api/articles/${article_id}`,
    { inc_votes: voteDifference }
  );
};

export const getTopics = () => {
  return axios
    .get("https://be-server-project.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getUser = username => {
  return axios
    .get(`https://be-server-project.herokuapp.com/api/users/${username}`)
    .then(({ data }) => {
      return data.user;
    });
};
