'use strict';
(function () {

  var KIND_PRODUCTS = [
    'Мороженое',
    'Газировка',
    'Жевательная резинка',
    'Мармелад',
    'Зефир'
  ];

  var catalog = document.querySelector('.catalog__cards');
  var catalogLoad = document.querySelector('.catalog__load');
  var catalogFilter = document.querySelector('.catalog__sidebar');
  var allCases = catalogFilter.querySelectorAll('.input-btn__input');
  var caseFilters = document.querySelectorAll('.input-btn__input--case');
  var kindCases = document.querySelectorAll('.input-btn__input--type');
  var sortCases = document.querySelectorAll('.input-btn__input--sort');
  var emptyCase = document.querySelector('#empty-filters').content.querySelector('div');

  var sortOptions = {
    0: function (a, b) {
      return b.rating.number - a.rating.number;
    },
    1: function (a, b) {
      return b.price - a.price;
    },
    2: function (a, b) {
      return a.price - b.price;
    },
    3: function (a, b) {
      return b.rating.value - a.rating.value;
    }
  };

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

  var sortCatalog = function (cardData) {
    sortCases.forEach(function (item, index) {
      if (item.checked) {
        cardData.sort(function (a, b) {
          return sortOptions[index](a, b);
        });
      }
    });
    return cardData;
  };

  var catalogLoadHandler = function () {
    catalogLoad.classList.add('visually-hidden');
    catalog.classList.remove('catalog__cards--load');
  };

  var renderCardFragment = function (cardData) {
    var fragment = document.createDocumentFragment();
    cardData.forEach(function (item) {
      fragment.appendChild(window.catalog.renderCard(item));
    });
    return fragment;
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

  var activateEmptyCase = function () {
    catalog.innerHTML = '';
    catalog.appendChild(emptyCase);
  };

  var updateCatalog = function (cardData) {
    catalog.innerHTML = '';
    catalog.appendChild(renderCardFragment(cardData));
  };

  var caseChangeHandler = window.debounce(function (cardData) {
    sortCatalog(cardData);
    var filteredCards = cardData.filter(function (item) {
      return (selectProperty(item) && selectKind(item));
    });
    window.amount.getByProperty(filteredCards);
    return (!filteredCards.length) ? activateEmptyCase() : updateCatalog(filteredCards);
  });

  var caseMarkHandler = window.debounce(function (selectFilter, cardData) {
    if (selectFilter.checked) {
      window.price.reset();
      window.amount.getProducts(cardData);
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
    KIND_PRODUCTS: KIND_PRODUCTS,
    reset: resetCases,
    updateCatalog: updateCatalog,
    caseChangeHandler: caseChangeHandler,
    catalogLoadHandler: catalogLoadHandler,
    caseMarkHandler: caseMarkHandler,
    property: propertyCases
  };
})();
