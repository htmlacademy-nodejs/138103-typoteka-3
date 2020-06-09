'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../constants`);
let data = null;

module.exports.getMockData = async () => {
  if (data !== null) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return data;
};
