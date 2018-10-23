'use strict';

(function () {

  var LITTLE_QUANTITY = 5;

  var RATING_CLASSES = [
    'stars__rating--one',
    'stars__rating--two',
    'stars__rating--three',
    'stars__rating--four',
    'stars__rating--five'
  ];

  var cardTemplate = document.querySelector('#card').content.querySelector('.card');
  var filter = document.querySelector('.filter__form');
  var filterFavorite = document.querySelector('#filter-favorite');
  var filterAvailability = document.querySelector('#filter-availability');
  var showAllBtn = document.querySelector('.catalog__submit');

  var loadCards = [];
  var catalogCards = loadCards.slice();
  var favoriteCards = [];


  var getAmountClass = function (amount) {
    if (!amount) {
      return 'card--soon';
    }
    return amount > LITTLE_QUANTITY ? 'card--in-stock' : 'card--little';
  };


  var renderCard = function (element) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardBtnAdd = cardElement.querySelector('.card__btn');
    var cardBtnFavorite = cardElement.querySelector('.card__btn-favorite');
    var cardBtnComposition = cardElement.querySelector('.card__btn-composition');

    cardElement.classList.remove('card--in-stock');
    cardElement.querySelector('.stars__rating').classList.remove('stars__rating--five');
    cardElement.classList.add(getAmountClass(element.amount));
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__img').src = 'img/cards/' + element.picture;
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
      window.order.activateFields();
      window.delivery.activateFields();
      window.payment.activate();
    });

    cardBtnFavorite.addEventListener('click', function (evt) {
      evt.preventDefault();
      cardBtnFavorite.classList.toggle('card__btn-favorite--selected');
      if (cardBtnFavorite.classList.contains('card__btn-favorite--selected') && !element.favorite) {
        element.favorite = true;
        favoriteCards[favoriteCards.length] = element;
        window.amount.getFavorite(favoriteCards);
      } else {
        element.favorite = false;
        favoriteCards.forEach(function (item, index) {
          if (item.name === element.name) {
            favoriteCards.splice(index, 1);
          }
        });
        window.amount.getFavorite(favoriteCards);
      }
    });

    cardBtnFavorite.classList.toggle('card__btn-favorite--selected', !!element.favorite);

    cardBtnComposition.addEventListener('click', function (evt) {
      evt.preventDefault();
      cardElement.querySelector('.card__composition').classList.toggle('card__composition--hidden');
    });

    return cardElement;
  };


  var getAvailabilityProducts = function () {
    var products = loadCards.filter(function (item) {
      return (!window.order.getAvailabilityStatus(item) && item.amount > 0);
    });
    window.amount.getByAvailability(products);
    return products;
  };


  var priceChangeHandler = function () {
    catalogCards = loadCards.filter(window.price.set).slice();
    window.filter.caseChangeHandler(catalogCards);
    window.amount.getProducts(catalogCards);
  };


  var initCatalog = function () {
    catalogCards = loadCards.filter(window.price.set);
    window.amount.getProducts(catalogCards);
    window.amount.getFavorite(favoriteCards);
    window.filter.updateCatalog(catalogCards);
  };

  var successLoadHandler = function (data) {
    loadCards = data.slice();
    initCatalog();
    window.filter.catalogLoadHandler();
  };


  var errorLoadHandler = function (textMessage) {
    window.message.error(textMessage);
  };

  var getMarkFiltersStatus = function () {
    return (filterFavorite.checked || filterAvailability.checked);
  };

  var filterHadler = window.debounce(function (evt) {
    if (evt.target === filterFavorite) {
      filterAvailability.checked = false;
      window.filter.caseMarkHandler(filterFavorite, favoriteCards);
    } else if (evt.target === filterAvailability) {
      filterFavorite.checked = false;
      window.catalog.priceChangeHandler();
      window.filter.caseMarkHandler(filterAvailability, getAvailabilityProducts());
    } else {
      window.filter.caseChangeHandler(catalogCards);
    }
  });

  var showAllBtnHandler = function (evt) {
    evt.preventDefault();
    window.filter.reset();
    window.price.reset();
    initCatalog();
  };

  var activateCatalog = function () {
    window.backend.load(successLoadHandler, errorLoadHandler);
    filter.addEventListener('change', filterHadler);
    showAllBtn.addEventListener('click', showAllBtnHandler);
  };

  activateCatalog();

  window.catalog = {
    renderCard: renderCard,
    priceChangeHandler: priceChangeHandler,
    getMarkFiltersStatus: getMarkFiltersStatus,
    init: initCatalog
  };

})();
