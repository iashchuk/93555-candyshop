'use strict';

(function () {

  var candyOptions = {
    NAME: [
      'Чесночные сливки',
      'Огуречный педант',
      'Молочная хрюша',
      'Грибной шейк',
      'Баклажановое безумие',
      'Паприколу итальяно',
      'Нинзя-удар васаби',
      'Хитрый баклажан',
      'Горчичный вызов',
      'Кедровая липучка',
      'Корманный портвейн',
      'Чилийский задира',
      'Беконовый взрыв',
      'Арахис vs виноград',
      'Сельдерейная душа',
      'Початок в бутылке',
      'Чернющий мистер чеснок',
      'Раша федераша',
      'Кислая мина',
      'Кукурузное утро',
      'Икорный фуршет',
      'Новогоднее настроение',
      'С пивком потянет',
      'Мисс креветка',
      'Бесконечный взрыв',
      'Невинные винные',
      'Бельгийское пенное',
      'Острый язычок'
    ],

    NUTRITION_CONTENT: [
      'молоко',
      'сливки',
      'вода',
      'пищевой краситель',
      'патока',
      'ароматизатор бекона',
      'ароматизатор свинца',
      'ароматизатор дуба, идентичный натуральному',
      'ароматизатор картофеля',
      'лимонная кислота',
      'загуститель',
      'эмульгатор',
      'консервант: сорбат калия',
      'посолочная смесь: соль, нитрит натрия',
      'ксилит',
      'карбамид',
      'вилларибо',
      'виллабаджо'
    ],

    PHOTO_FOLDER: 'img/cards/',

    PHOTO_EXTENSION: '.jpg',

    PHOTO_PICTURE: [
      'gum-cedar',
      'gum-chile',
      'gum-eggplant',
      'gum-mustard',
      'gum-portwine',
      'gum-wasabi',
      'ice-cucumber',
      'ice-eggplant',
      'ice-garlic',
      'ice-italian',
      'ice-mushroom',
      'ice-pig',
      'marmalade-beer',
      'marmalade-caviar',
      'marmalade-corn',
      'marmalade-new-year',
      'marmalade-sour',
      'marshmallow-bacon',
      'marshmallow-beer',
      'marshmallow-shrimp',
      'marshmallow-spicy',
      'marshmallow-wine',
      'soda-bacon',
      'soda-celery',
      'soda-cob',
      'soda-garlic',
      'soda-peanut-grapes',
      'soda-russian'
    ],

    amount: {
      MIN: 0,
      MAX: 20
    },

    weight: {
      MIN: 100,
      MAX: 1000
    },

    price: {
      MIN: 100,
      MAX: 1500
    },

    ratingValue: {
      MIN: 1,
      MAX: 5
    },

    ratingNumber: {
      MIN: 10,
      MAX: 900
    },

    nutritionSugar: [
      true,
      false
    ],

    nutririonEnergy: {
      MIN: 70,
      MAX: 500
    }
  };

  var shufflePhotos = window.utils.shuffleElements(candyOptions.PHOTO_PICTURE);

  /**
   * Функция получения ссылки
   * @param {Array.<string>} photoLinks
   * @param {number} index
   * @return {string}
   */
  var getPhotoLink = function (photoLinks, index) {
    return candyOptions.PHOTO_FOLDER + photoLinks[index] + candyOptions.PHOTO_EXTENSION;
  };

  /**
   * @typedef {Object} Rating
   * @property {number} value
   * @property {number} number
   */

  /**
   * @typedef {Object} Facts
   * @property {boolean} sugar
   * @property {number} energy
   * @property {string} contents
   */

  /**
   * @typedef {Object} Card
   * @property {string} name
   * @property {string} picture
   * @property {number} amount
   * @property {number} price
   * @property {number} weight
   * @property {Rating}
   * @property {Facts}
   */

  /**
   * Функция генерации данных для карточки товара
   * @param {number} index
   * @return {Card}
   */

  window.getData = function (index) {
    return {
      name: candyOptions.NAME[index],
      picture: getPhotoLink(shufflePhotos, index),
      amount: window.utils.getRandomInRange(candyOptions.amount.MIN, candyOptions.amount.MAX),
      price: window.utils.getRandomInRange(candyOptions.price.MIN, candyOptions.price.MAX),
      weight: window.utils.getRandomInRange(candyOptions.weight.MIN, candyOptions.weight.MAX),
      rating: {
        value: window.utils.getRandomInRange(candyOptions.ratingValue.MIN, candyOptions.ratingValue.MAX),
        number: window.utils.getRandomInRange(candyOptions.ratingNumber.MIN, candyOptions.ratingNumber.MAX),
      },
      nutritionFacts: {
        sugar: window.utils.getRandomElement(candyOptions.nutritionSugar),
        energy: window.utils.getRandomInRange(candyOptions.nutririonEnergy.MIN, candyOptions.nutririonEnergy.MAX),
        contents: window.utils.getRandomString(candyOptions.NUTRITION_CONTENT)
      }
    };
  };

})();
