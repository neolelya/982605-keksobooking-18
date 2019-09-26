'use strict';
var QUANTITY = 8;
var TITLES = ['Предложение', 'Обьявление', 'Мы предлагаем', 'Новинка'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var GUESTS = [1, 2, 3, 4, 5];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Великолепная квартира с прекрасным расположением.', 'Приветливая хозяйка, отличный район, очень чисто в квартире.', 'Хозяева — очень гостеприимные и отзывчивые', 'Легкое самостоятельное прибытие с помощью мини-сейфа.', 'Идеальная чистота'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var dialogWindow = document.querySelector('.map');
dialogWindow.classList.remove('map--faded');

var pinsContainer = dialogWindow.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

var getRandomFromRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getAuthor = function (number) {
  return {
    avatar: 'img/avatars/user' + '0' + number + '.png'
  };
};

var getRandomArray = function (values) {
  var result = [];
  for (var i = 0; i < values.length; i++) {
    if (getRandomFromRange(0, 1)) {
      result.push(values[i]);
    }
  }
  return result;
};

var getRandomLocation = function () {
  return {
    x: getRandomFromRange(0, dialogWindow.offsetWidth),
    y: getRandomFromRange(130, 630)
  };
};

var getRandomOffer = function (location) {
  return {
    title: getRandomArrayItem(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandomFromRange(500, 10000),
    type: getRandomArrayItem(TYPES),
    rooms: getRandomFromRange(1, 7),
    guests: getRandomArrayItem(GUESTS),
    checkin: getRandomArrayItem(CHECK_TIMES),
    checkout: getRandomArrayItem(CHECK_TIMES),
    features: getRandomArray(FEATURES),
    description: getRandomArrayItem(DESCRIPTIONS),
    photos: getRandomArray(PHOTOS)
  };
};

var getRandomProperty = function (number) {
  var location = getRandomLocation();
  return {
    author: getAuthor(number),
    offer: getRandomOffer(location),
    location: location
  };
};

var getMockProperties = function (quantity) {
  var result = [];
  for (var i = 0; i < quantity; i++) {
    result[i] = getRandomProperty(i + 1);
  }
  return result;
};

var mockProperties = getMockProperties(QUANTITY);

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  return fragment;
};
pinsContainer.appendChild(renderPins(mockProperties));

var pluralize = function (count, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
};

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
  cardElement.querySelector('.popup__text--capacity').textContent = pluralize(card.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + card.offer.guests + ((card.offer.guests > 1) ? ' гостей' : ' гостя');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = getCardsFeatures(card);
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = getPhotos(card, cardElement.querySelector('.popup__photos img'));
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};

pinsContainer.appendChild(renderCard(getRandomProperty(1)));
