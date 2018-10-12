'use strict';

(function () {
  var cardOrderTemplate = document.querySelector('#card-order').content.querySelector('.card-order');
  var goodsCards = document.querySelector('.goods__cards');
  var goodsCardEmpty = document.querySelector('.goods__card-empty');
  var goodsCardEmptyTemplate = goodsCardEmpty.cloneNode(true);
  var goodsTotalBasket = document.querySelector('.goods__total');
  var goodsTotalHeader = document.querySelector('.main-header__basket');
  var orderFormFields = document.querySelectorAll('.text-input__input');
  var orderFormSubmit = document.querySelector('.buy__submit-btn');
  var orderCards = [];


  var checkContain = function (orderList, element) {
    var isContained = false;
    orderList.forEach(function (item) {
      if (item.name === element.name) {
        isContained = true;
      }
    });
    return isContained;
  };

  var getTotalOrder = function (orderList) {
    var totalPrice = 0;
    var totalAmount = 0;
    for (var i = 0; i < orderList.length; i++) {
      totalPrice += orderCards[i].price * orderCards[i].total;
      totalAmount += orderCards[i].total;
    }
    return {
      price: totalPrice,
      amount: totalAmount
    };
  };

  var renderTotalOrder = function () {
    var total = getTotalOrder(orderCards).amount + ' ' + window.utils.getDeclension(getTotalOrder(orderCards).amount, ['товар', 'товара', 'товаров']);
    goodsTotalBasket.querySelector('.goods__total-count').textContent = 'Итого за ' + total + ': ' + getTotalOrder(orderCards).price + ' ₽';
    goodsTotalHeader.textContent = 'В корзине ' + total + '. Итого за ' + total + ': ' + getTotalOrder(orderCards).price + ' ₽';
  };

  var cleanOrder = function () {
    goodsCards.innerHTML = '';
    orderCards = [];
    goodsCards.appendChild(goodsCardEmptyTemplate);
    goodsTotalBasket.classList.add('visually-hidden');
    goodsTotalHeader.textContent = 'В корзине ничего нет';
  };

  var orderCardCloseHandler = function (element) {
    orderCards.forEach(function (item, index) {
      if (item.name === element.name) {
        orderCards.splice(index, 1);
      }
    });

    goodsCards.innerHTML = '';

    if (orderCards.length) {
      goodsCards.appendChild(renderOrderCardFragment(orderCards));
    } else {
      cleanOrder();
    }
  };

  var getOrderElement = function (element) {
    var orderElelement = Object.assign({
      total: 1
    }, element);

    delete orderElelement.weight;
    delete orderElelement.rating;
    delete orderElelement.nutritionFacts;

    return orderElelement;
  };

  var addGoodToBasket = function (element) {
    var isContained = checkContain(orderCards, element);
    if (isContained) {
      orderCards.forEach(function (item) {
        if (item.name === element.name && item.total < item.amount) {
          item.total++;
        }
      });
    } else if (element.amount) {
      orderCards.push(getOrderElement(element));
    } else {
      return;
    }
    goodsTotalBasket.classList.remove('visually-hidden');
    goodsCards.innerHTML = '';
    goodsCards.appendChild(renderOrderCardFragment(orderCards));
  };


  var renderOrderCard = function (element) {
    var cardElement = cardOrderTemplate.cloneNode(true);
    var closeBtn = cardElement.querySelector('.card-order__close');
    var decreaseBtn = cardElement.querySelector('.card-order__btn--decrease');
    var increaseBtn = cardElement.querySelector('.card-order__btn--increase');

    cardElement.querySelector('.card-order__title').textContent = element.name;
    cardElement.querySelector('.card-order__img').src = 'img/cards/' + element.picture;
    cardElement.querySelector('.card-order__img').alt = element.name;
    cardElement.querySelector('.card-order__count').value = element.total;
    var amount = cardElement.querySelector('.card-order__count').value;
    cardElement.querySelector('.card-order__price').textContent = amount * element.price + ' ₽';

    closeBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      orderCardCloseHandler(element);
      renderTotalOrder();

      if (!orderCards.length) {
        deactivateFormFields();
        goodsTotalHeader.textContent = 'В корзине ничего нет';
      }
    });

    decreaseBtn.addEventListener('click', function () {
      if (element.total === 1) {
        orderCardCloseHandler(element);
        if (!orderCards.length) {
          deactivateFormFields();
        }
      } else {
        element.total--;
        cardElement.querySelector('.card-order__count').value = element.total;
        cardElement.querySelector('.card-order__price').textContent = element.total * element.price + ' ₽';
      }
      renderTotalOrder();
    });

    increaseBtn.addEventListener('click', function () {
      if (element.amount > element.total) {
        element.total++;
        cardElement.querySelector('.card-order__count').value = element.total;
        cardElement.querySelector('.card-order__price').textContent = element.total * element.price + ' ₽';
        renderTotalOrder();
      }
    });
    return cardElement;
  };

  var renderOrderCardFragment = function (cardData) {
    var fragment = document.createDocumentFragment();
    cardData.forEach(function (item) {
      fragment.appendChild(renderOrderCard(item));
    });
    return fragment;
  };

  var getAvailabilityStatus = function (element) {
    var status = orderCards.some(function (item) {
      return (item.name === element.name && item.amount === element.amount);
    });
    return status;
  };

  var deactivateFormFields = function () {
    orderFormFields.forEach(function (item) {
      item.disabled = true;
      orderFormSubmit.disabled = true;
    });
  };

  var activeFormFileds = function () {
    orderFormFields.forEach(function (item) {
      item.disabled = false;
      orderFormSubmit.disabled = false;
    });
  };

  deactivateFormFields();


  window.order = {
    addGoodToBasket: addGoodToBasket,
    activeFormFileds: activeFormFileds,
    deactivateFormFields: deactivateFormFields,
    renderTotalOrder: renderTotalOrder,
    getAvailabilityStatus: getAvailabilityStatus,
    clean: cleanOrder
  };
})();
