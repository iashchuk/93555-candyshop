'use strict';

(function () {

  var deliverMethod = document.querySelector('.deliver__toggle');
  var deliverBtnStore = document.querySelector('#deliver__store');
  var deliverBtnCourier = document.querySelector('#deliver__courier');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverCourier = document.querySelector('.deliver__courier');
  var deliverPoint = document.querySelectorAll('.deliver__store-item');

  var photoOptions = {
    PATH: 'img/map/',
    EXTENSION: '.jpg'
  };

  var getPhotoLink = function (photoName) {
    return photoOptions.PATH + photoName + photoOptions.EXTENSION;
  };

  var selectStore = function () {
    var map = document.querySelector('.deliver__store-map-img');
    deliverPoint.forEach(function (item) {
      item.addEventListener('click', function () {
        var label = item.querySelector('label');
        var input = item.querySelector('input');
        input.checked = true;
        map.src = getPhotoLink(input.value);
        map.alt = label.textContent;
      });
    });
  };


  var selectDeliveryHandler = function (evt) {
    if (evt.target === deliverBtnStore || evt.target === deliverBtnCourier) {
      deliverStore.classList.toggle('visually-hidden');
      deliverCourier.classList.toggle('visually-hidden');
    }
  };

  selectStore();
  deliverMethod.addEventListener('click', selectDeliveryHandler);


})();
