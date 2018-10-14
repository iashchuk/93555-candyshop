'use strict';

(function () {

  var deliver = document.querySelector('.deliver');
  var deliverMethod = document.querySelector('.deliver__toggle');
  var deliverBtnStore = document.querySelector('#deliver__store');
  var deliverBtnCourier = document.querySelector('#deliver__courier');
  var deliverStore = document.querySelector('.deliver__store');
  var deliverCourier = document.querySelector('.deliver__courier');
  var deliverPoints = document.querySelectorAll('.deliver__store-item');
  var deliverPoint = deliver.querySelector('.input-btn__input--radio');
  var deliverFields = deliver.querySelectorAll('input');
  var deliverDescribe = document.querySelector('.deliver__store-describe');
  var deliverStoresFieldset = document.querySelector('.deliver__stores');
  var deliverCourierFieldset = document.querySelector('.deliver__entry-fields-wrap');

  var AddressList = {
    'academicheskaya': 'проспект Науки, д. 19, корп. 3, литер А, ТК «Платформа», 3-й этаж, секция 310',
    'vasileostrovskaya': 'Адрес #2. Василеостровская',
    'rechka': 'Адрес #3. Черная речка',
    'petrogradskaya': 'Адрес #4. Петроградская',
    'proletarskaya': 'Адрес #5. Пролетарская',
    'vostaniya': 'Адрес #6. Площадь Восстания',
    'prosvesheniya': 'Адрес #7. Проспект Просвещения',
    'frunzenskaya': 'Адрес #8. Фрунзенская',
    'chernishevskaya': 'Адрес #9. Чернышевская',
    'tehinstitute': 'Адрес #10. Технологический институт'
  };

  var photoOptions = {
    PATH: 'img/map/',
    EXTENSION: '.jpg'
  };


  var getPhotoLink = function (photoName) {
    return photoOptions.PATH + photoName + photoOptions.EXTENSION;
  };

  var getStoreInfo = function (item) {
    var map = document.querySelector('.deliver__store-map-img');
    var label = item.querySelector('label');
    var input = item.querySelector('input');
    if (input.checked) {
      map.src = getPhotoLink(input.value);
      map.alt = label.textContent;
      deliverDescribe.textContent = AddressList[input.value];
    }
  };

  var selectStore = function () {
    deliverPoints.forEach(function (item) {
      item.addEventListener('click', function () {
        getStoreInfo(item);
      });
    });
  };

  var deactivateDeliverFields = function () {
    deliverFields.forEach(function (item) {
      item.disabled = true;
    });
  };

  var activateDeliverFields = function () {
    deliverFields.forEach(function (item) {
      item.disabled = false;
    });
  };

  var setDeliverFieldsetStatus = function () {
    deliverCourierFieldset.disabled = deliverBtnStore.checked;
    deliverStoresFieldset.disabled = deliverBtnCourier.checked;
  };

  var resetDeliveryMethod = function () {
    deliverStore.classList.remove('visually-hidden');
    deliverCourier.classList.add('visually-hidden');
    deliverCourierFieldset.disabled = true;
    deactivateDeliverFields();
    deliverPoint.checked = true;
    getStoreInfo(deliverPoints[0]);
  };

  var selectDeliveryHandler = function (evt) {
    if (evt.target === deliverBtnStore) {
      deliverStore.classList.remove('visually-hidden');
      deliverCourier.classList.add('visually-hidden');
    } else if (evt.target === deliverBtnCourier) {
      deliverStore.classList.add('visually-hidden');
      deliverCourier.classList.remove('visually-hidden');
    }
    setDeliverFieldsetStatus();
  };

  var initDeliverModule = function () {
    setDeliverFieldsetStatus();
    deactivateDeliverFields();
    selectStore();
    deliverMethod.addEventListener('click', selectDeliveryHandler);
  };

  initDeliverModule();

  window.delivery = {
    reset: resetDeliveryMethod,
    deactivateFields: deactivateDeliverFields,
    activateFields: activateDeliverFields
  };

})();
