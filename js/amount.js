'use strict';
(function () {

  var KIND_PRODUCTS = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];

  var productPriceCount = document.querySelector('.range__count');
  var productFavoriteCount = document.querySelector('.input-btn__item-count--favorite');
  var productAvailabilityCount = document.querySelector('.input-btn__item-count--availability');
  var productKindsCount = document.querySelectorAll('.input-btn__item-count--type');
  var productPropertiesCount = document.querySelectorAll('.input-btn__item-count--property');

  var propertyCases = {
    sugar: function (element) {
      return (!element.nutritionFacts.sugar);
    },
    vegetarian: function (element) {
      return (element.nutritionFacts.vegetarian);
    },
    gluten: function (element) {
      return (!element.nutritionFacts.gluten);
    }
  };

  var getAmountByKind = function (index, kind, cardData) {
    var amount = cardData.filter(function (item) {
      return item.kind === kind;
    });
    productKindsCount[index].textContent = '(' + amount.length + ')';
  };

  var getAmountByProperty = function (cardData) {
    productPropertiesCount.forEach(function (property, index) {
      var amount = cardData.filter(function (item) {
        return propertyCases[property.id](item);
      });
      productPropertiesCount[index].textContent = '(' + amount.length + ')';
    });
  };

  var getAmountByAvailability = function (cardData) {
    var amount = cardData.filter(function (item) {
      return (item.amount > 0);
    });
    productAvailabilityCount.textContent = '(' + amount.length + ')';
  };

  var getAmountByPrice = function (cardData) {
    var amount = cardData.filter(window.price.set);
    productPriceCount.textContent = '(' + amount.length + ')';
  };

  var getAmountFavorite = function (favoriteGoodsList) {
    productFavoriteCount.textContent = '(' + favoriteGoodsList.length + ')';
  };

  var getAmountProducts = function (cardData) {
    KIND_PRODUCTS.forEach(function (kind, index) {
      getAmountByKind(index, kind, cardData);
    });
    getAmountByProperty(cardData);
    getAmountByAvailability(cardData);
    getAmountByPrice(cardData);
  };

  window.amount = {
    getProducts: getAmountProducts,
    getFavorite: getAmountFavorite,
    getByProperty: getAmountByProperty,
    getByAvailability: getAmountByAvailability
  };
})();
