'use strict';

(function () {
  var QUANTITY_CARDS = 26;

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
    var cardBtnAdd = cardElement.querySelector('.card__btn');
    var cardBtnFavorite = cardElement.querySelector('.card__btn-favorite');
    var cardBtnComposition = cardElement.querySelector('.card__btn-composition');

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

    cardBtnAdd.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.order.addGoodToBasket(element);
      window.order.renderTotalOrder();
      window.order.activeFormFileds();
    });

    cardBtnFavorite.addEventListener('click', function (evt) {
      evt.preventDefault();
      cardBtnFavorite.classList.toggle('card__btn-favorite--selected');
      document.activeElement.blur();
    });

    cardBtnComposition.addEventListener('click', function (evt) {
      evt.preventDefault();
      cardElement.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    });

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
  var renderCardFragment = function (CardData) {
    var fragment = document.createDocumentFragment();
    CardData.forEach(function (item) {
      fragment.appendChild(renderCard(item));
    });
    return fragment;
  };

  var initPage = function () {
    var cardList = getCardData(QUANTITY_CARDS);
    catalogCards.classList.remove('catalog__cards--load');
    catalogLoad.classList.add('visually-hidden');
    catalogCards.appendChild(renderCardFragment(cardList));
  };

  initPage();

})();
