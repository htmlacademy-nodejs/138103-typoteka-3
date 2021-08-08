'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {
  HttpCode
} = require(`../../constants`);

const articles = require(`./articles`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const mockData = [{
  "id": `IHSWOd`,
  "title": `Как научиться не бояться высоты`,
  "createdDate": `2021-05-27 09:41:11`,
  "announce": `Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  "fullText": `Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов. Это то, чем мы сейчас живем. Весь наш восторг, любовь и знания мы готовы передать Вам. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Снаряжение в спортивном туризме зависит от его вида и включает в себя специальную одежду и обувь. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  "сategory": [`Программирование`, `IT`, `Железо`, `Музыка`],
  "comments": [{
    "id": `tVmqeR`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }]
}, {
  "id": `RS5G47`,
  "title": `Самый лучший музыкальный альбом этого года`,
  "createdDate": `2021-08-02 06:40:44`,
  "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  "fullText": `Снаряжение в спортивном туризме зависит от его вида и включает в себя специальную одежду и обувь. Программировать не настолько сложно, как об этом говорят. Как начать действовать? Для начала просто соберитесь. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  "сategory": [`За жизнь`, `Без рамки`, `Туризм`, `Деревья`, `Кино`, `Физика`],
  "comments": [{
    "id": `Mf6ZFV`,
    "text": `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
  }, {
    "id": `mwaAHM`,
    "text": `Согласен с автором!`
  }, {
    "id": `wmSGOl`,
    "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }]
}, {
  "id": `wczjFa`,
  "title": `Спортивный туризм - это легко`,
  "createdDate": `2021-06-07 16:05:24`,
  "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это то, чем мы сейчас живем. Весь наш восторг, любовь и знания мы готовы передать Вам. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  "fullText": `Скалолазание для нас – это часть жизни. Это не только спорт. Золотое сечение — соотношение двух величин, гармоническая пропорция. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Из под его пера вышло 8 платиновых альбомов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Из под его пера вышло 8 платиновых альбомов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Скалолазание для нас – это часть жизни. Это не только спорт. Снаряжение в спортивном туризме зависит от его вида и включает в себя специальную одежду и обувь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Ёлки — это не просто красивое дерево. Это прочная древесина. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха.`,
  "сategory": [`Рисование`, `Скалолазание`],
  "comments": [{
    "id": `CkdyXc`,
    "text": `Это где ж такие красоты?`
  }]
}, {
  "id": `OANFbx`,
  "title": `Самый лучший музыкальный альбом этого года`,
  "createdDate": `2021-07-01 02:12:00`,
  "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  "fullText": `Спортивный туризм — вид спорта, имеющий целью спортивное совершенствование человека в преодолении естественных препятствий. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Он написал больше 30 хитов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  "сategory": [`Разное`],
  "comments": [{
    "id": `jwE7ND`,
    "text": `Хочу такую же футболку :-)`
  }]
}, {
  "id": `KAg6HN`,
  "title": `Учим HTML и CSS`,
  "createdDate": `2021-07-19 18:08:49`,
  "announce": `Первая большая ёлка была установлена только в 1938 году. Скалолазание для нас – это часть жизни. Это не только спорт. Скалолазание для нас – это часть жизни. Это не только спорт. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  "fullText": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Спортивный туризм — вид спорта, имеющий целью спортивное совершенствование человека в преодолении естественных препятствий. Собрать камни бесконечности легко, если вы прирожденный герой. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Ёлки — это не просто красивое дерево. Это прочная древесина. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят.`,
  "сategory": [],
  "comments": [{
    "id": `X5tSqY`,
    "text": `Согласен с автором!`
  }, {
    "id": `fxoTxk`,
    "text": `Это где ж такие красоты? Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?`
  }, {
    "id": `msBVqR`,
    "text": `Согласен с автором! Хочу такую же футболку :-)`
  }, {
    "id": `XhWYpl`,
    "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }]
}];

const newArticle = {
  title: `Как правильно отметить день альпиниста`,
  createdDate: `2020-08-07T21:00:00.000Z`,
  announce: `Вяжем восьмерки`,
  fullText: `Не забудьте связаться с друзьями`,
  сategory: [`Горы`, `Сырые ботинки`]
};

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new ArticleService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  test(`First article's id equals "IHSWOd"`, () => expect(response.body[0].id).toBe(`IHSWOd`));
});

describe(`API returns an article with given id`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles/wczjFa`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title equals "Спортивный туризм - это легко"`, () =>
    expect(response.body.title).toBe(`Спортивный туризм - это легко`));
});

describe(`API creates an article if data is valid`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  let app;

  beforeAll(async () => {
    app = createAPI();
  });

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {
        ...newArticle
      };
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
  test(`Article count is 5`, () => request(app)
    .get(`/articles`)
    .expect((res) => {
      expect(res.body.length).toBe(5);
    })
  );
});

describe(`API changes existent article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .put(`/articles/IHSWOd`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () =>
    expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article is really changed`, async () => request(app)
    .get(`/articles/IHSWOd`)
    .expect((res) => expect(res.body).toEqual(expect.objectContaining(newArticle))));
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    title: `валидный`,
    createdDate: `2020-08-07T21:00:00.000Z`,
    announce: `объект`,
    fullText: `статьи`,
    сategory: [`Это`],
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: [`Это`],
    title: `невалидный`,
    announce: `объект`,
    fullText: `статьи`,
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/articles/KAg6HN`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`KAg6HN`));
  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of all comments by articleId = KAg6HN`, () => {
  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles/KAg6HN/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 4 comments`, () => expect(response.body.length).toBe(4));
  test(`First comments's id equals "X5tSqY"`, () => expect(response.body[0].id).toBe(`X5tSqY`));
});

describe(`API creates a comment if data is valid`, () => {
  let app;
  let response;

  const newComment = {
    text: `Очень хорошая статья`
  };

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .post(`/articles/KAg6HN/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body.comment).toEqual(expect.objectContaining(newComment)));
  test(`Articles count is changed`, () => request(app)
    .get(`/articles/KAg6HN/comments`)
    .expect((res) => expect(res.body.length).toBe(5))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

describe(`API correctly deletes a comment`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = createAPI();
    response = await request(app)
      .delete(`/articles/KAg6HN/comments/msBVqR`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted comment`, () => expect(response.body.id).toBe(`msBVqR`));
  test(`Comment count is 3 now`, () => request(app)
    .get(`/articles/KAg6HN/comments`)
    .expect((res) => expect(res.body.length).toBe(3))
  );
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/KAg6HN/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});
