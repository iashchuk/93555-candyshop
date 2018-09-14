'use strict';

(function () {

  var QUANTITY_CARDS = 26;
  var QUANTITY_ORDERS = 3;
  var CATALOG_CARD = 1;
  var GOODS_CARD = 0;

  var RATING_CLASSES = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five'
  ];

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
  var catalog = document.querySelector('.catalog');
  var catalogCards = catalog.querySelector('.catalog__cards');
  var catalogLoad = catalog.querySelector('.catalog__load');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var cardTemplate = document.querySelector('#card').content.querySelector('.card');
  var cardOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');

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

  var getData = function (index) {
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

  /**
   * Функция получения класса количества наличия товара
   * @param {number} amount
   * @return {string}
   */

  var getAmountClass = function (amount) {
    if (amount === 0) {
      return 'card--soon';
    }
    return amount > 5 ? 'card--in-stock' : 'card--little';
  };

  /**
   * Отрисовка карточки каталога
   * @param {Card} element
   * @return {Node}
   */
  var renderCard = function (element) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.classList.remove('card--in-stock');
    cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
    cardElement.classList.add(getAmountClass(element.amount));
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__img').src = element.picture;
    cardElement.querySelector('.card__img').alt = element.name;
    cardElement.querySelector('.card__price').childNodes[0].textContent = element.price + ' ';
    cardElement.querySelector('.card__weight').textContent = '/ ' + element.weight + 'Г';
    cardElement.querySelector('.stars__rating').classList.add(RATING_CLASSES[element.rating.value - 1]);
    cardElement.querySelector('.star__count').textContent = '(' + element.rating.number + ')';
    cardElement.querySelector('.card__characteristic').textContent = element.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';
    cardElement.querySelector('.card__composition-list').textContent = element.nutritionFacts.contents;

    return cardElement;
  };

  /**
   * Отрисовка карточек добавленных в корзины
   * @param {Card} element
   * @return {Node}
   */

  var renderOrderCard = function (element) {
    var cardElement = cardOrderTemplate.cloneNode(true);

    cardElement.querySelector('.card-order__title').textContent = element.name;
    cardElement.querySelector('.card-order__img').src = element.picture;
    cardElement.querySelector('.card-order__img').alt = element.name;
    cardElement.querySelector('.card-order__price').textContent = element.price + ' ₽';
    cardElement.querySelector('.card-order__count').value = element.amount;

    return cardElement;
  };

  /**
 * Функция получения массива карточек
 * @param {number} quantity
 * @return {Array.<Card>}
 */
  var getCardData = function (quantity) {
    var CardData = [];

    for (var i = 0; i < quantity; i++) {
      CardData.push(getData(i));
    }
    return CardData;
  };

  /**
   * Функция получения фрагмента
   * @param {Array.<Card>} CardData
   * @param {boolean} typeCard для каталога / для корзины
   * @return {Node}
   */
  var renderCardFragment = function (CardData, typeCard) {
    var fragment = document.createDocumentFragment();
    CardData.forEach(function (item) {
      fragment.appendChild((typeCard ? renderCard : renderOrderCard)(item));
    });
    return fragment;
  };

  // Функция инициилизации страницы
  var initPage = function () {
    var cardList = getCardData(QUANTITY_CARDS);
    var cardOrderList = getCardData(QUANTITY_ORDERS);

    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
    goodsCards.classList.remove('goods__cards--empty');
    goodsCardEmpty.classList.add('visually-hidden');


    catalogCards.appendChild(renderCardFragment(cardList, CATALOG_CARD));
    goodsCards.appendChild(renderCardFragment(cardOrderList, GOODS_CARD));
  };

  initPage();

})();
