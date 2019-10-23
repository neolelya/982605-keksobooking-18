'use strict';

(function () {
  var cardUnit;

  var dialogWindow = document.querySelector('.map');

  var pinsContainer = dialogWindow.querySelector('.map__pins');

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var cardClose;

  var getCardsFeatures = function (card) {
    var cardsFeatures = [];
    for (var i = 0; i < card.offer.features.length; i++) {
      cardsFeatures.push('<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>');
    }
    return cardsFeatures.join('');
  };

  var getPhotos = function (card, imgNode) {
    var cardPhotos = [];
    for (var i = 0; i < card.offer.photos.length; i++) {
      var img = imgNode.cloneNode();
      img.src = card.offer.photos[i];
      cardPhotos.push(img.outerHTML);
    }
    return cardPhotos.join('');
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var cardTypeNames = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = cardTypeNames[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = window.util.pluralize(card.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + card.offer.guests + ((card.offer.guests > 1) ? ' гостей' : ' гостя');
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = getCardsFeatures(card);
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = getPhotos(card, cardElement.querySelector('.popup__photos img'));
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    return cardElement;
  };

  var cardCloseClickHandler = function () {
    resetCard();
  };

  var cardCloseKeydownHandler = function (evt) {
    if (window.util.isEscEvent(evt)) {
      resetCard();
    }
  };

  var insertCard = function (data) {
    if (cardUnit) {
      resetCard();
    }
    cardUnit = renderCard(data);
    pinsContainer.appendChild(cardUnit);
    cardClose = cardUnit.querySelector('.popup__close');
    cardClose.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardCloseKeydownHandler);
  };

  var resetCard = function () {
    cardClose.removeEventListener('click', cardCloseClickHandler);
    document.removeEventListener('keydown', cardCloseKeydownHandler);
    pinsContainer.removeChild(cardUnit);
    cardUnit = null;
  };

  window.card = {
    insertCard: insertCard,

    resetCard: resetCard
  };
})();
