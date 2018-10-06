'use strict';

(function () {

  var deliverMethod = document.querySelector('.deliver__toggle');
  var deliverBtnStore = document.querySelector('#deliver__store');
  var deliverBtnCourier = document.querySelector('#deliver__courier');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverCourier = document.querySelector('.deliver__courier');
  var deliverPoint = document.querySelectorAll('.deliver__store-item');
  var deliverDescribe = document.querySelector('.deliver__store-describe');

  var photoOptions = {
    PATH: 'img/map/',
    EXTENSION: '.jpg'
  };

  var AddressList = {
    'academicheskaya': 'проспект Науки, д. 19, корп. 3, литер А, ТК «Платформа», 3-й этаж, секция 310',
    'vasileostrovskaya': 'Адрес №2',
    'rechka': 'Адрес №3',
    'petrogradskaya': 'Адрес №4',
    'proletarskaya': 'Адрес №5',
    'vostaniya': 'Адрес №6',
    'prosvesheniya': 'Адрес №7',
    'frunzenskaya': 'Адрес №8',
    'chernishevskaya': 'Адрес №9',
    'tehinstitute': 'Адрес №10'
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
        deliverDescribe.textContent = AddressList[input.value];
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
