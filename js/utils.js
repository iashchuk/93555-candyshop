'use strict';

(function () {
  /**
   * Функция получения случайного элемента массива
   * @param {Array} arrayElements
   * @return {*}
   */
  var getRandomElement = function (arrayElements) {
    var index = Math.floor(Math.random() * arrayElements.length);
    return arrayElements[index];
  };

  /**
   * Функция получения случайного числа в интервале заданных чисел
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  /**
   * Функция тасования массива по алгоритму Фишера-Йетса
   * @param {Array} arrayElements
   * @return {Array}
   */
  var shuffleElements = function (arrayElements) {
    for (var i = arrayElements.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arrayElements[j];
      arrayElements[j] = arrayElements[i];
      arrayElements[i] = temp;
    }
    return arrayElements;
  };

  /**
   * Функция получения строки произвольной длины из массива
   * @param {Array} arrayElements
   * @return {string}
   */
  var getRandomString = function (arrayElements) {
    var newArray = shuffleElements(arrayElements);
    return newArray.slice(0, getRandomInRange(1, newArray.length)).join(', ');
  };

  /**
   * Функция получения массива случайной длины
   * @param {Array} arrayElements
   * @return {Array}
   */
  var getRandomArray = function (arrayElements) {
    var newLength = getRandomInRange(1, arrayElements.length);
    var tempArray = shuffleElements(arrayElements);
    var newArray = [];
    for (var i = 0; i < newLength; i++) {
      newArray.push(tempArray[i]);
    }
    return newArray;
  };

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomInRange: getRandomInRange,
    shuffleElements: shuffleElements,
    getRandomString: getRandomString,
    getRandomArray: getRandomArray
  };
})();
