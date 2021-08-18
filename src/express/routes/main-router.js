'use strict';

const {
  Router
} = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main/main`, {
    articles
  });
}); // главная страница
mainRouter.get(`/register`, (req, res) => res.render(`main/sign-up`)); // регистрация
mainRouter.get(`/login`, (req, res) => res.render(`main/login`)); // вход
mainRouter.get(`/search`, async (req, res) => {
  try {
    const {
      search
    } = req.query;

    if (!search) {
      res.render(`main/search`);
    }
    const results = await api.search(search);
    res.render(`main/search`, {
      results,
      search
    });
  } catch (error) {
    res.render(`main/search`, {
      results: []
    });
  }
}); // поиск
mainRouter.get(`/categories`, (req, res) => res.render(`main/all-categories`)); // категории

module.exports = mainRouter;
