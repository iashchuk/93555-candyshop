'use strict';

(function () {
  var paymentMethod = document.querySelector('.payment__method');
  var paymentBtnCard = document.querySelector('#payment__card');
  var paymentBtnCash = document.querySelector('#payment__cash');
  var paymentCard = document.querySelector('.payment__card-wrap');
  var paymentCash = document.querySelector('.payment__cash-wrap');
  var paymentFields = document.querySelector('.payment__inputs');
  var cardNumber = paymentFields.querySelector('#payment__card-number');
  var cardDate = paymentFields.querySelector('#payment__card-date');
  var cardCVC = paymentFields.querySelector('#payment__card-cvc');

  var selectPaymentHandler = function (evt) {
    if (evt.target === paymentBtnCard || evt.target === paymentBtnCash) {
      paymentCard.classList.toggle('visually-hidden');
      paymentCash.classList.toggle('visually-hidden');
    }
  };

  var checkCardLuhnAlgorithm = function (number) {
    var digits = number.replace(/\s/g, '').split('').map(Number);
    var total = 0;
    for (var i = 0; i < digits.length; i++) {
      if ((digits.length - i) % 2 !== 0) {
        total += digits[i];
      } else {
        if (digits[i] * 2 > 9) {
          var getDigit = String(digits[i] * 2).split('').map(Number);
          total += getDigit[0] + getDigit[1];
        } else {
          total += (digits[i] * 2);
        }
      }
    }
    return total % 10 === 0 ? true : false;
  };

  var cardNumberHandler = function () {
    var cardLength = cardNumber.value.length;
    if (cardLength === 4 || cardLength === 9 || cardLength === 14) {
      cardNumber.value += ' ';
    }
  };


  var cardValidNumberHandler = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите 16 цифр номера банковской карты в формате ХХХХ ХХХХ ХХХХ ХХХХ');
    } else if (!checkCardLuhnAlgorithm(evt.target.value)) {
      evt.target.setCustomValidity('Неправильный номер банковской карты');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var cardDateHandler = function () {
    if (cardDate.value.length === 2) {
      cardDate.value += '/';
    }
  };

  var cardValidDateHandler = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите срок действия карты в формате мм/гг');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var cardValidCVCHandler = function (evt) {
    if (evt.target.validity.patternMismatch || evt.target.validity.tooShort) {
      evt.target.setCustomValidity('Введите CVC в указанном формате: трёхзначное число с диапазоном значений от 100 до 999');
    } else {
      evt.target.setCustomValidity('');
    }
  };


  paymentMethod.addEventListener('click', selectPaymentHandler);
  cardNumber.addEventListener('keypress', cardNumberHandler);
  cardNumber.addEventListener('change', cardValidNumberHandler);
  cardDate.addEventListener('keypress', cardDateHandler);
  cardDate.addEventListener('change', cardValidDateHandler);
  cardCVC.addEventListener('change', cardValidCVCHandler);

})();
