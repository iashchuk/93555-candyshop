'use strict';
(function () {

  var KIND_PRODUCTS = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];

  var catalogCards = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var catalogFilter = document.querySelector('.catalog__sidebar');
  var allCases = catalogFilter.querySelectorAll('.input-btn__input');
  var caseFilters = document.querySelectorAll('.input-btn__input--case');
  var kindCases = document.querySelectorAll('.input-btn__input--type');
  var sortCases = document.querySelectorAll('.input-btn__input--sort');
  var emptyCase = document.querySelector('#empty-filters').content.querySelector('div');
  var productPriceCount = document.querySelector('.range__count');
  var productFavoriteCount = document.querySelector('.input-btn__item-count--favorite');
  var productAvailabilityCount = document.querySelector('.input-btn__item-count--availability');
  var productTypeCount = document.querySelectorAll('.input-btn__item-count--type');
  var productPropertyCount = document.querySelectorAll('.input-btn__item-count--property');

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

  var catalogLoadHandler = function () {
    catalogLoad.classList.add('visually-hidden');
    catalogCards.classList.remove('catalog__cards--load');
  };

  var renderCardFragment = function (cardData) {
    var fragment = document.createDocumentFragment();
    cardData.forEach(function (item) {
      fragment.appendChild(window.catalog.renderCard(item));
    });
    return fragment;
  };

  var updateCatalog = function (cardData) {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(renderCardFragment(cardData));
  };

  var activateEmptyCase = function () {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(emptyCase);
  };

  var sortCatalog = function (cardData) {
    sortCases.forEach(function (item, index) {
      if (item.checked) {
        if (index === 0) {
          cardData.sort(function (a, b) {
            return b.rating.number - a.rating.number;
          });
        } else if (index === 1) {
          cardData.sort(function (a, b) {
            return b.price - a.price;
          });
        } else if (index === 2) {
          cardData.sort(function (a, b) {
            return a.price - b.price;
          });
        } else if (index === 3) {
          cardData.sort(function (a, b) {
            return b.rating.value - a.rating.value;
          });
        }
      }
    });
    return cardData;
  };

  var selectProperty = function (element) {
    var selectProperties = document.querySelectorAll('.input-btn__input--property:checked');
    var properties = Array.from(selectProperties);
    var select = properties.every(function (input) {
      return propertyCases[input.value](element);
    });
    return select;
  };

  var selectKind = function (element) {
    var select = true;
    var kinds = [];
    kindCases.forEach(function (item, index) {
      if (item.checked) {
        kinds[kinds.length] = KIND_PRODUCTS[index];
      }
    });
    if (kinds.length) {
      select = kinds.some(function (kind) {
        return kind === element.kind;
      });
    }
    return select;
  };

  var resetCases = window.debounce(function () {
    allCases.forEach(function (item) {
      item.checked = false;
      item.disabled = false;
    });
    sortCases[0].checked = true;
  });

  var getAmountByKind = function (index, kind, cardData) {
    var amount = cardData.filter(function (item) {
      return item.kind === kind;
    });
    productTypeCount[index].textContent = '(' + amount.length + ')';
  };


  var getAmountByProperty = function (cardData) {
    productPropertyCount.forEach(function (property, index) {
      var amount = cardData.filter(function (item) {
        return propertyCases[property.id](item);
      });
      productPropertyCount[index].textContent = '(' + amount.length + ')';
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

  var caseChangeHandler = window.debounce(function (cardData) {
    sortCatalog(cardData);
    var filteredCards = cardData.filter(function (item) {
      return (selectProperty(item) && selectKind(item));
    });
    getAmountByProperty(filteredCards);
    return (!filteredCards.length) ? activateEmptyCase() : updateCatalog(filteredCards);
  });

  var caseMarkHandler = window.debounce(function (selectFilter, cardData) {
    if (selectFilter.checked) {
      window.price.reset();
      getAmountProducts(cardData);
      caseFilters.forEach(function (item) {
        item.checked = false;
        item.disabled = true;
      });

      if (!cardData.length) {
        activateEmptyCase();
      } else {
        updateCatalog(cardData);
      }
    } else {
      caseFilters.forEach(function (item) {
        item.disabled = false;
      });
      resetCases();
      updateCatalog(cardData);
      caseChangeHandler(cardData);
    }
  });

  window.filter = {
    reset: resetCases,
    updateCatalog: updateCatalog,
    getAmountProducts: getAmountProducts,
    getAmountFavorite: getAmountFavorite,
    getAmountByProperty: getAmountByProperty,
    getAmountByAvailability: getAmountByAvailability,
    caseChangeHandler: caseChangeHandler,
    catalogLoadHandler: catalogLoadHandler,
    caseMarkHandler: caseMarkHandler,
  };
})();
