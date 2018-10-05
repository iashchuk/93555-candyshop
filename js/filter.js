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

  toggleLeft.style.left = 0;
  toggleRight.style.right = 0;
  bar.style.left = TOGGLE_SIZE + toggleLeft.offsetLeft + 'px';
  bar.style.right = TOGGLE_SIZE + 'px';

  var getPrice = function (toggle) {
    var coords = toggle.getBoundingClientRect();
    var toggleCoords = coords.x;
    var price = Math.round((toggleCoords - rangeStartCoords) / step);
    return price;
  };

  minRangePrice.textContent = getPrice(toggleLeft);
  maxRangePrice.textContent = getPrice(toggleRight);

})();
