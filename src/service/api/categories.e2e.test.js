'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {
  HttpCode
} = require(`../../constants`);

const categories = require(`./categories`);
const CategoryService = require(`../data-service/category`);

const mockData = [{
  "id": `acLrZd`,
  "title": `Учим HTML и CSS`,
  "createdDate": `2021-06-08 16:15:33`,
  "announce": `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  "fullText": `Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Собрать камни бесконечности легко, если вы прирожденный герой.`,
  "сategory": [`За жизнь`, `IT`, `Скалолазание`, `Железо`, `Разное`],
  "comments": [{
    "id": `9rT4Iv`,
    "text": `Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?`
  }, {
    "id": `GhBZ4-`,
    "text": `Хочу такую же футболку :-)`
  }]
}, {
  "id": `wqGR6E`,
  "title": `Что такое золотое сечение`,
  "createdDate": `2021-05-21 12:57:37`,
  "announce": `Первая большая ёлка была установлена только в 1938 году. Он написал больше 30 хитов. Скалолазание для нас – это часть жизни. Это не только спорт. Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Он написал больше 30 хитов. Скалолазание для нас – это часть жизни. Это не только спорт. Он написал больше 30 хитов.`,
  "сategory": [`Деревья`],
  "comments": [{
    "id": `5B9KzR`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
  }, {
    "id": `EGaMm5`,
    "text": `Совсем немного... Это где ж такие красоты?`
  }]
}, {
  "id": `W3EPEV`,
  "title": `Как перестать беспокоиться и начать жить`,
  "createdDate": `2021-06-30 21:09:18`,
  "announce": `Спортивный туризм — вид спорта, имеющий целью спортивное совершенствование человека в преодолении естественных препятствий. Это то, чем мы сейчас живем. Весь наш восторг, любовь и знания мы готовы передать Вам. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  "fullText": `Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Скалолазание для нас – это часть жизни. Это не только спорт. Из под его пера вышло 8 платиновых альбомов. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Золотое сечение — соотношение двух величин, гармоническая пропорция. Первая большая ёлка была установлена только в 1938 году. Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Собрать камни бесконечности легко, если вы прирожденный герой. Скалолазание для нас – это часть жизни. Это не только спорт. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Золотое сечение — соотношение двух величин, гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Скалолазание для нас – это часть жизни. Это не только спорт. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  "сategory": [`Кино`, `Рисование`, `Физика`, `Без рамки`, `Программирование`],
  "comments": [{
    "id": `nZDUWJ`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {
    "id": `jqHbAC`,
    "text": `Согласен с автором!`
  }, {
    "id": `7A7tTJ`,
    "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
  }, {
    "id": `BdRm6z`,
    "text": `Плюсую, но слишком много буквы!`
  }]
}, {
  "id": `EDWzOW`,
  "title": `Что такое золотое сечение`,
  "createdDate": `2021-07-08 20:30:32`,
  "announce": `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Как начать действовать? Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения.`,
  "fullText": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Спортивный туризм — вид спорта, имеющий целью спортивное совершенствование человека в преодолении естественных препятствий. Как начать действовать? Для начала просто соберитесь. Скалолазание для нас – это часть жизни. Это не только спорт. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Это один из лучших рок-музыкантов. Это то, чем мы сейчас живем. Весь наш восторг, любовь и знания мы готовы передать Вам. Скалолазание для нас – это часть жизни. Это не только спорт. Золотое сечение — соотношение двух величин, гармоническая пропорция. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  "сategory": [`Музыка`],
  "comments": [{
    "id": `vQQamm`,
    "text": `Это где ж такие красоты?`
  }, {
    "id": `MijPZV`,
    "text": `Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {
    "id": `1I0lXk`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
  }, {
    "id": `y0h9pT`,
    "text": `Совсем немного... Согласен с автором!`
  }]
}, {
  "id": `QdWQug`,
  "title": `Как достигнуть успеха не вставая с кресла`,
  "createdDate": `2021-05-29 07:39:59`,
  "announce": `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  "fullText": `Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Достичь успеха помогут ежедневные повторения. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Как начать действовать? Для начала просто соберитесь. Спортивный туризм — вид спорта, имеющий целью спортивное совершенствование человека в преодолении естественных препятствий. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  "сategory": [`Туризм`],
  "comments": [{
    "id": `RdmZRq`,
    "text": `Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение что вы меня поучаете.`
  }, {
    "id": `kLZTMf`,
    "text": `Мне не нравится ваш стиль. Ощущение что вы меня поучаете. Это где ж такие красоты? Совсем немного...`
  }, {
    "id": `UtmAIU`,
    "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного...`
  }]
}];

const app = express();
app.use(express.json());
categories(app, new CategoryService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 13 categories`, () => expect(response.body.length).toBe(13));
  test(`Category names are "За жизнь", "IT", "Скалолазание", "Железо", "Разное", "Деревья",
  "Кино", "Рисование", "Физика", "Без рамки", "Программирование", "Музыка", "Туризм"`, () =>
    expect(response.body).toEqual(expect.arrayContaining([
      `За жизнь`, `IT`, `Скалолазание`, `Железо`, `Разное`, `Деревья`, `Кино`,
      `Рисование`, `Физика`, `Без рамки`, `Программирование`, `Музыка`, `Туризм`
    ])));
});