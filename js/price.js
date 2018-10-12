'use strict';

(function () {

  var PRICE_RANGE = 100;
  var TOGGLE_SIZE = 10;

  var range = document.querySelector('.range');
  var toggleLeft = range.querySelector('.range__btn--left');
  var toggleRight = range.querySelector('.range__btn--right');
  var filter = range.querySelector('.range__filter');
  var minRangePrice = range.querySelector('.range__price--min');
  var maxRangePrice = range.querySelector('.range__price--max');
  var bar = range.querySelector('.range__fill-line');

  var filterCoords = filter.getBoundingClientRect();
  var scale = filterCoords.width - TOGGLE_SIZE;
  var step = scale / PRICE_RANGE;
  var rangeStartCoords = filterCoords.x;


  var getPrice = function (toggle) {
    var coords = toggle.getBoundingClientRect();
    var toggleCoords = coords.x;
    var price = Math.round((toggleCoords - rangeStartCoords) / step);
    return price;
  };

  var resetPrice = function () {
    toggleLeft.style.left = 0 + 'px';
    toggleRight.style.left = scale + 'px';
    bar.style.left = TOGGLE_SIZE + toggleLeft.offsetLeft + 'px';
    bar.style.right = TOGGLE_SIZE + 'px';
    minRangePrice.textContent = getPrice(toggleLeft);
    maxRangePrice.textContent = getPrice(toggleRight);
  };

  var setPrice = function (element) {
    var minPrice = getPrice(toggleLeft);
    var maxPrice = getPrice(toggleRight);
    return (element.price >= minPrice && element.price <= maxPrice);
  };


  var onMouseDown = function (evt) {
    if (!window.catalog.getMarkFiltersStatus()) {
      evt.preventDefault();

      var startCoords = evt.target.offsetLeft;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = evt.clientX - moveEvt.clientX;
        var current = startCoords - shift;

        if (evt.target === toggleLeft && current >= 0 && current <= toggleRight.offsetLeft) {
          evt.target.style.left = current + 'px';
          bar.style.left = current + 'px';
          minRangePrice.textContent = getPrice(evt.target);
        }

        if (evt.target === toggleRight && current <= scale && current >= toggleLeft.offsetLeft) {
          evt.target.style.left = current + 'px';
          bar.style.right = (scale - current) + 'px';
          maxRangePrice.textContent = getPrice(evt.target);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.catalog.priceChangeHandler();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var filterActivate = function () {
    toggleLeft.addEventListener('mousedown', onMouseDown);
    toggleRight.addEventListener('mousedown', onMouseDown);
  };

  resetPrice();
  filterActivate();

  window.price = {
    reset: resetPrice,
    set: setPrice
  };


})();
