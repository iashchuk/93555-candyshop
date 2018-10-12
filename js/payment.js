'use strict';

(function () {
  var form = document.querySelector('.buy__form');
  var paymentMethod = document.querySelector('.payment__method');
  var paymentBtnCard = document.querySelector('#payment__card');
  var paymentBtnCash = document.querySelector('#payment__cash');
  var paymentCard = document.querySelector('.payment__card-wrap');
  var paymentCash = document.querySelector('.payment__cash-wrap');
  var paymentFields = paymentCard.querySelectorAll('input');
  var paymentBlock = document.querySelector('.payment__inputs');
  var cardNumber = paymentBlock.querySelector('#payment__card-number');
  var cardDate = paymentBlock.querySelector('#payment__card-date');
  var cardCVC = paymentBlock.querySelector('#payment__card-cvc');
  var cardHolder = paymentBlock.querySelector('#payment__cardholder');
  var cardStatus = document.querySelector('.payment__card-status');


  var setFieldsStatus = function (fields, isDisabled) {
    fields.forEach(function (item) {
      item.disabled = isDisabled;
    });
  };

  var resetPaymentMethod = function () {
    paymentCash.classList.add('visually-hidden');
    paymentCard.classList.remove('visually-hidden');
  };

  var selectPaymentHandler = function (evt) {
    if (evt.target === paymentBtnCash) {
      paymentCash.classList.remove('visually-hidden');
      paymentCard.classList.add('visually-hidden');
    } else if (evt.target === paymentBtnCard) {
      resetPaymentMethod();
    }

    if (paymentBtnCard.checked) {
      setFieldsStatus(paymentFields, false);
    } else {
      setFieldsStatus(paymentFields, true);
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
    return (total % 10 === 0);
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

  var cardHolderHandler = function () {
    cardHolder.value = cardHolder.value.toUpperCase();
  };

  var cardValidHolderHandler = function (evt) {
    if (evt.target.validity.patternMismatch) {
      evt.target.setCustomValidity('Введите имя и фамилию на английском языке');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  var paymentInformationHandler = function () {
    if (cardNumber.checkValidity() && cardDate.checkValidity() &&
      cardCVC.checkValidity() && cardHolder.checkValidity()) {
      cardStatus.textContent = 'Одобрен';
    } else {
      cardStatus.textContent = 'Не определён';
    }
  };

  var formSuccessHandler = function () {
    form.reset();
    window.message.confirm();
  };

  var formErrorHandler = function (textMessage) {
    window.message.error(textMessage);
  };


  var formSubmitHandler = function (evt) {
    if (form.checkValidity()) {
      evt.preventDefault();
      window.backend.upload(formSuccessHandler, formErrorHandler, new FormData(form));
      resetPaymentMethod();
      window.delivery.reset();
      window.order.clean();
      window.order.deactivateFormFields();
      window.filter.reset();
      window.price.reset();
      window.catalog.init();
    }
  };

  var initPayment = function () {
    paymentMethod.addEventListener('click', selectPaymentHandler);
    cardNumber.addEventListener('keypress', cardNumberHandler);
    cardNumber.addEventListener('change', cardValidNumberHandler);
    cardDate.addEventListener('keypress', cardDateHandler);
    cardDate.addEventListener('change', cardValidDateHandler);
    cardCVC.addEventListener('change', cardValidCVCHandler);
    cardHolder.addEventListener('input', cardHolderHandler);
    cardHolder.addEventListener('change', cardValidHolderHandler);
    paymentBlock.addEventListener('change', paymentInformationHandler);
    form.addEventListener('submit', formSubmitHandler);
  };

  initPayment();

})();
