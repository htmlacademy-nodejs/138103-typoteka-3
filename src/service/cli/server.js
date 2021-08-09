'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);

const {
  getLogger
} = require(`../lib/logger`);

const {
  HttpCode,
  API_PREFIX,
  ExitCode
} = require(`../../constants`);

const app = express();
app.use(express.json());

const DEFAULT_PORT = 3000;

const logger = getLogger({
  name: `api`
});

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;
    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`Ошибка при создании сервера`, err);
        }

        return logger.info(chalk.green(`Ожидаю соединений на ${port}`));
      });

    } catch (err) {
      logger.error(`Произошла ошибка: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  }
};
