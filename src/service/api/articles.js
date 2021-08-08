'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../../constants`);
const articleExist = require(`../middlewars/article-exist`);
const articleValidator = require(`../middlewars/article-validator`);
const commentValidator = require(`../middlewars/comment-validator`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();

  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();

    return res.status(HttpCode.OK)
      .json(articles);
  });

  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {
      article
    } = res.locals;

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`, [articleValidator, articleExist(articleService)], (req, res) => {
    const {
      articleId
    } = req.params;
    const updatedArticle = articleService.update(articleId, req.body);

    if (!updatedArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {
      articleId
    } = req.params;
    const deletedArticle = articleService.drop(articleId);

    if (!deletedArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {
      article
    } = res.locals;
    const comments = commentService.findAll(article);

    return res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExist(articleService), (req, res) => {
    const {
      article
    } = res.locals;
    const {
      commentId
    } = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${commentId}`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {
      article
    } = res.locals;
    const comment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
