'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.send(`/articles/category/:id`)); // публикации определённой категории
articlesRouter.get(`/add`, (req, res) => res.send(`/articles/add`)); // страница создания новой публикации
articlesRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`)); // страница публикации
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`)); // редактирование публикации

module.exports = articlesRouter;
