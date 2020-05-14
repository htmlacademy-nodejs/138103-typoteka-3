'use strict';

const {
    getRandomInt,
    shuffle,
} = require(`../../utils`);

const {
    DEFAULT_COUNT,
    FILE_NAME,
    MAX_PUBLICATIONS,
    TITLES,
    SENTENCES,
    CATEGORIES
} = require(`../../constants`);

let moment = require('moment');
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

function createRandomDate() {
    // startDate и endDate в формате timestamp
    const startDate = moment().subtract(3, 'months').format('x');
    const endDate = moment().format('x');
    const randomDate = getRandomInt(startDate, endDate);
    return moment(randomDate).format('YYYY-MM-DD HH:mm:ss')
}

function createAnnounce() {
    return Array(getRandomInt(1, 5)).fill('').map(() => SENTENCES[getRandomInt(0, SENTENCES.length - 1)]).join(` `);
}

function createFullText() {
    return Array(getRandomInt(0, SENTENCES.length - 1)).fill('').map(() => SENTENCES[getRandomInt(0, SENTENCES.length - 1)]).join(` `);
}
function createCategory() {
    return Array(getRandomInt(0, CATEGORIES.length - 1)).fill('').map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]);
}

const generateArticles = (count) => (
    Array(count).fill({}).map(() => ({
        title: [TITLES[getRandomInt(0, TITLES.length - 1)]],
        createdDate: createRandomDate(),
        announce: createAnnounce(),
        fullText: createFullText(),
        сategory: createCategory(),
    }))
);

module.exports = {
    name: `--generate`,
    async run(args) {
        const [count] = args;
        const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
        if (countArticles <= MAX_PUBLICATIONS) {
            const content = JSON.stringify(generateArticles(countArticles));
            try {
                await fs.writeFile(FILE_NAME, content);
                console.info(chalk.green(`Operation success. File created.`));
                process.exit(1);
            } catch (err) {
                console.info(chalk.red(`Can't write data to file...`));
                process.exit(1);
            }
        } else {
            console.info(chalk.red('Вы можете сгенерировать не более 1000 публикаций'));
        }
    }
}