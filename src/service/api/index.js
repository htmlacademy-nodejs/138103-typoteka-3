'use strict';

const {
  CategoryService,
  SearchService,
  CommentService,
  ArticleService
} = require(`../data-service`);

const {
  Router
} = require(`express`);
const categories = require(`./categories`);
const articles = require(`./articles`);
const search = require(`./search`);
const {
  getMockData
} = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  articles(app, new ArticleService(mockData), new CommentService());
  search(app, new SearchService(mockData));
})();

module.exports = app;
