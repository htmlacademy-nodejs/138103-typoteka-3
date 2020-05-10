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
const fs = require(`fs`);

function createRandomDate() {
    // startDate и endDate в формате timestamp
    const startDate = moment().subtract(3, 'months').format('x');
    const endDate = moment().format('x');
    const randomDate = getRandomInt(startDate, endDate);
    return moment(randomDate).format('YYYY-MM-DD HH:mm:ss')
}

const generateArticles = (count) => (
    Array(count).fill({}).map(() => ({
        title: [TITLES[getRandomInt(0, TITLES.length - 1)]],
        createdDate: createRandomDate(),
        announce: Array(getRandomInt(0, 5)).fill('').map(() => SENTENCES[getRandomInt(0, SENTENCES.length - 1)]).join(` `),
        fullText: Array(getRandomInt(0, SENTENCES.length - 1)).fill('').map(() => SENTENCES[getRandomInt(0, SENTENCES.length - 1)]).join(` `),
        сategory: Array(getRandomInt(0, CATEGORIES.length - 1)).fill('').map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]),
    }))
);

module.exports = {
    name: `--generate`,
    run(args) {
        const [count] = args;
        const countArticles = Number.parseInt(count, 10) || DEFAULT_COUNT;
        if (countArticles <= MAX_PUBLICATIONS) {
            const content = JSON.stringify(generateArticles(countArticles));
            fs.writeFile(FILE_NAME, content, (err) => {
                if (err) {
                    process.exit(1);
                }
                process.exit();
            });
        } else {
            console.info('Вы можете сгенерировать не более 1000 публикаций');
        }
    }
}