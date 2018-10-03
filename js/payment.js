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


  paymentMethod.addEventListener('click', selectPaymentHandler);

})();
