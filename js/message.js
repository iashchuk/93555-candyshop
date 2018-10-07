'use strict';

(function () {

  /**
   * @constant {number}
   */
  var ESC_KEYCODE = 27;

  var modalConfirm = document.querySelector('.modal--confirm');
  var modalConfirmClose = modalConfirm.querySelector('.modal__close');


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

  window.message = {
    confirm: activateConfirmMessage,
  };

})();
