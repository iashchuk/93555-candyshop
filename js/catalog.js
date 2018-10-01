'use strict';

(function () {

  var QUANTITY_CARDS = 26;
  var CATALOG_CARD = 1;
  var GOODS_CARD = 0;

  var RATING_CLASSES = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five'
  ];

  var catalog = document.querySelector('.catalog');
  var catalogCards = catalog.querySelector('.catalog__cards');
  var catalogLoad = catalog.querySelector('.catalog__load');
  var cardTemplate = document.querySelector('#card').content.querySelector('.card');
  var cardOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var goodsCardEmptyTemplate = goodsCardEmpty.cloneNode(true);
  var goodsTotalBasket = document.querySelector('.goods__total');
  var goodsTotalHeader = document.querySelector('.main-header__basket');
  var order = [];

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
    cardElement.querySelector('.card-order__count').value = element.total;
    var amount = cardElement.querySelector('.card-order__count').value;
    cardElement.querySelector('.card-order__price').textContent = amount * element.price + ' ₽';

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
      CardData.push(window.getData(i));
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


  var initPage = function () {
    var cardList = getCardData(QUANTITY_CARDS);
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
    catalogCards.appendChild(renderCardFragment(cardList, CATALOG_CARD));
  };

  initPage();
})();
