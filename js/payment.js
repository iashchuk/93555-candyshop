'use strict';

(function () {
  var paymentMethod = document.querySelector('.payment__method');
  var paymentBtnCard = document.querySelector('#payment__card');
  var paymentBtnCash = document.querySelector('#payment__cash');
  var paymentCard = document.querySelector('.payment__card-wrap');
  var paymentCash = document.querySelector('.payment__cash-wrap');


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


  paymentMethod.addEventListener('click', selectPaymentHandler);

})();
