'use strict';

const {
  Router
} = require(`express`);
const api = require(`../api`).getAPI();

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my/my`, {
    articles
  });
}); // мои публикации
myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my/comments`, {
    articles: articles.slice(0, 3)
  });
}); // комментарии к публикациям

module.exports = myRouter;
