'use strict';

const fields = [`title`, `createdDate`, `announce`, `fullText`, `сategory`];
const {HttpCode} = require(`../../constants`);

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExist = fields.every((key) => keys.includes(key));

  if (!keysExist) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
