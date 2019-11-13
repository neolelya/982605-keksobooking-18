'use strict';

(function () {
  var cardUnit;

  var dialogWindow = document.querySelector('.map');
  var pinsContainer = dialogWindow.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardClose;

  var getCardsFeatures = function (card) {
    var cardsFeatures = card.offer.features.map(function (element) {
      return '<li class="popup__feature popup__feature--' + element + '"></li>';
    });
    return cardsFeatures.join('');
  };

  var getPhotos = function (card, imgNode) {
    return card.offer.photos.map(function (photo) {
      var img = imgNode.cloneNode();
      img.src = photo;
      return img.outerHTML;
    }).join('');
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTypeNames = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    if (card.offer.title) {
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      cardElement.querySelector('.popup__title').classList.add('visually-hidden');
    }
    if (card.offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').classList.add('visually-hidden');
    }
    if (card.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    } else {
      cardElement.querySelector('.popup__text--price').classList.add('visually-hidden');
    }
    if (card.offer.type) {
      cardElement.querySelector('.popup__type').textContent = cardTypeNames[card.offer.type];
    } else {
      cardElement.querySelector('.popup__type').classList.add('visually-hidden');
    }
    if (card.offer.rooms && card.offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = window.util.pluralize(card.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + card.offer.guests + ((card.offer.guests > 1) ? ' гостей' : ' гостя');
    } else {
      cardElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }
    if (card.offer.checkin && card.offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      cardElement.querySelector('.popup__text--time').classList.add('visually-hidden');
    }
    if (card.offer.features) {
      cardElement.querySelector('.popup__features').innerHTML = getCardsFeatures(card);
    } else {
      cardElement.querySelector('.popup__features').classList.add('visually-hidden');
    }
    if (card.offer.description) {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      cardElement.querySelector('.popup__description').classList.add('visually-hidden');
    }
    if (card.offer.photos) {
      cardElement.querySelector('.popup__photos').innerHTML = getPhotos(card, cardElement.querySelector('.popup__photos img'));
    } else {
      cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
    }
    if (card.author.avatar) {
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').classList.add('visually-hidden');
    }
    return cardElement;
  };

  var cardCloseClickHandler = function () {
    reset();
    window.pins.removeActiveClass();
  };

  var cardCloseKeydownHandler = function (evt) {
    if (window.util.isEscEvent(evt)) {
      reset();
      window.pins.removeActiveClass();
    }
  };

  var insert = function (data) {
    if (cardUnit) {
      reset();
    }
    cardUnit = renderCard(data);
    pinsContainer.appendChild(cardUnit);
    cardClose = cardUnit.querySelector('.popup__close');
    cardClose.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardCloseKeydownHandler);
  };

  var reset = function () {
    if (!cardUnit) {
      return;
    }
    cardClose.removeEventListener('click', cardCloseClickHandler);
    document.removeEventListener('keydown', cardCloseKeydownHandler);
    pinsContainer.removeChild(cardUnit);
    cardUnit = null;
  };

  window.card = {
    insert: insert,

    reset: reset
  };
})();
