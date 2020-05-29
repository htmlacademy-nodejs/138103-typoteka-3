'use strict';

const {Router} = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main`)); // главная страница
mainRouter.get(`/register`, (req, res) => res.render(`login`)); // регистрация
mainRouter.get(`/login`, (req, res) => res.render(`sign-up`)); // вход
mainRouter.get(`/search`, (req, res) => res.render(`search`)); // поиск
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`)); // категории

module.exports = mainRouter;
