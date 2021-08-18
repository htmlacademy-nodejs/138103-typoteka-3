'use strict';

const {
  Router
} = require(`express`);
const api = require(`../api`).getAPI();
const {
  getLogger
} = require(`../../service/lib/logger`);
const multer = require(`multer`);
const path = require(`path`);
const {
  nanoid
} = require(`nanoid`);
const moment = require(`moment`);

const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({
  storage
});

const logger = getLogger({
  name: `articlesRouter`
});

const articlesRouter = new Router();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`)); // публикации определённой категории
articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  const date = moment().format(`DD.MM.YYYY`);
  res.render(`articles/new-post`, {
    categories,
    date
  });
}); // страница создания новой публикации
articlesRouter.post(`/add`, upload.single(`picture`), async (req, res) => {
  const {
    body,
    file
  } = req;
  const articleData = {
    picture: file ? file.filename : null,
    fullText: body.fullText,
    announce: body.announce,
    title: body.title,
    createdDate: body.createdDate,
    сategory: body.сategory || []
  };
  try {
    await api.createArticle(articleData);
    res.redirect(`../my`);
  } catch (error) {
    const categories = await api.getCategories();
    res.render(`articles/new-post`, {
      article: articleData,
      categories
    });
  }
}); // добавление новой публикации
articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`)); // страница публикации
articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories()
    ]);
    res.render(`articles/new-post`, {
      article,
      categories
    });
  } catch (error) {
    logger.error(error);
  }

}); // редактирование публикации

module.exports = articlesRouter;
