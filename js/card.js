'use strict';

(function () {
  var dialogWindow = document.querySelector('.map');

  var pinsContainer = dialogWindow.querySelector('.map__pins');

  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

  var oneCard = renderCard(window.data.randomProperty);

  var insertCard = function () {
    pinsContainer.appendChild(oneCard);
  };

  var resetCard = function () {
    pinsContainer.removeChild(oneCard);
  };

  window.card = {
    insertCard: insertCard,

    resetCard: resetCard
  };
})();
