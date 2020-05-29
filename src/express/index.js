'use strict';

const express = require(`express`);

const mainRouter = require(`./routes/main-router`);
const articlesRouter = require(`./routes/articles-router`);
const myRouter = require(`./routes/my-router`);

const DEFAULT_PORT = 8080;
const app = express();

app.use(`/`, mainRouter);
app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);

app.listen(DEFAULT_PORT);

