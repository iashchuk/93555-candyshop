'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var modalConfirm = document.querySelector('.modal--confirm');
  var modalConfirmClose = modalConfirm.querySelector('.modal__close');
  var modalError = document.querySelector('.modal--error');
  var modalErrorClose = modalError.querySelector('.modal__close');
  var modalErrorMessage = modalError.querySelector('.modal__message');


  var modalConfirmCloseHandler = function () {
    modalConfirm.classList.add('modal--hidden');
  };

  var confirmMessageEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      modalConfirmCloseHandler();
    }
  };

  var activateConfirmMessage = function () {
    modalConfirm.classList.remove('modal--hidden');
    modalConfirmClose.addEventListener('click', modalConfirmCloseHandler);
    document.addEventListener('keydown', confirmMessageEscPressHandler);
  };


  var modalErrorCloseHandler = function () {
    modalError.classList.add('modal--hidden');
  };

  var errorMessageEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      modalErrorCloseHandler();
    }
  };

  var activateErrorMessage = function (textMessage) {
    modalError.classList.remove('modal--hidden');
    modalErrorClose.addEventListener('click', modalErrorCloseHandler);
    modalErrorMessage.textContent = textMessage;
    document.addEventListener('keydown', errorMessageEscPressHandler);
  };


  window.message = {
    error: activateErrorMessage,
    confirm: activateConfirmMessage,
  };

})();
