'use strict';

const {
  getRandomInt
} = require(`../../utils`);

const {
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_PUBLICATIONS,
} = require(`../../constants`);

let moment = require(`moment`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

function createRandomDate() {
  // startDate и endDate в формате timestamp
  const startDate = moment().subtract(3, `months`).format(`x`);
  const endDate = moment().format(`x`);
  const randomDate = getRandomInt(startDate, endDate);
  return moment(randomDate).format(`YYYY-MM-DD HH:mm:ss`);
}

const createAnnounce = (sentences) => {
  return Array(getRandomInt(1, 5)).fill(``).map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
};

const createFullText = (sentences) => {
  return Array(getRandomInt(0, sentences.length - 1)).fill(``).map(() => sentences[getRandomInt(0, sentences.length - 1)]).join(` `);
};

const createCategory = (categories) => {
  return Array(getRandomInt(0, categories.length - 1)).fill(``).map(() => categories[getRandomInt(0, categories.length - 1)]);
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

const generateArticles = (count, titles, sentences, categories) => (
  Array(count).fill({}).map(() => ({
    title: [titles[getRandomInt(0, titles.length - 1)]],
    createdDate: createRandomDate(),
    announce: createAnnounce(sentences),
    fullText: createFullText(sentences),
    сategory: createCategory(categories),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countArticles <= MAX_PUBLICATIONS) {
      const content = JSON.stringify(generateArticles(countArticles, titles, sentences, categories));
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
