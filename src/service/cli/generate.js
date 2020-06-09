'use strict';

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_PUBLICATIONS,
  MAX_ID_LENGTH
} = require(`../../constants`);

let moment = require(`moment`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const MAX_COMMENTS_COUNT = 4;

function createRandomDate() {
  // startDate и endDate в формате timestamp
  const startDate = moment().subtract(3, `months`).format(`x`);
  const endDate = moment().format(`x`);
  const randomDate = getRandomInt(startDate, endDate);
  return moment(randomDate).format(`YYYY-MM-DD HH:mm:ss`);
}

const createAnnounce = (sentences) => {
  return Array(getRandomInt(1, 5)).fill(``)
    .map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
};

const createFullText = (sentences) => {
  return Array(getRandomInt(1, sentences.length - 1)).fill(``)
    .map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
};

const createCategory = (categories) => {
  return shuffle(categories).splice(0, getRandomInt(1, categories.length - 1));
};

const createComments = (comments) => {
  return Array(getRandomInt(1, MAX_COMMENTS_COUNT)).fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments)
        .slice(0, getRandomInt(1, 3))
        .join(` `)
    }));
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateArticles = (count, titles, sentences, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: createRandomDate(),
    announce: createAnnounce(sentences),
    fullText: createFullText(sentences),
    сategory: createCategory(categories),
    comments: createComments(comments)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countArticles <= MAX_PUBLICATIONS) {
      const content = JSON.stringify(generateArticles(countArticles, titles, sentences, categories, comments));
      try {
        await fs.writeFile(FILE_NAME, content);
        console.info(chalk.green(`Operation success. File created.`));
        process.exit(1);
      } catch (err) {
        console.info(chalk.red(`Can't write data to file...`));
        process.exit(1);
      }
    } else {
      console.info(chalk.red(`Вы можете сгенерировать не более 1000 публикаций`));
    }
  }
};
