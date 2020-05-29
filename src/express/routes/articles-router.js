'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`)); // публикации определённой категории
articlesRouter.get(`/add`, (req, res) => res.render(`new-post`)); // страница создания новой публикации
articlesRouter.get(`/:id`, (req, res) => res.render(`post`)); // страница публикации
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`post`)); // редактирование публикации

module.exports = articlesRouter;
