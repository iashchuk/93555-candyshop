'use strict';

(function () {

  /**
   * Функция получения правильного окончания слова
   * @param {number} number
   * @param {Array.<string>} meanings
   * @return {string}
   */
  var getDeclension = function (number, meanings) {
    var cases = [2, 0, 1, 1, 1, 2];
    return meanings[(number % 100 > 4 && number % 100 < 20) ?
      2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  window.utils = {
    getDeclension: getDeclension
  };
})();
