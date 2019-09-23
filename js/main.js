'use strict';
var QUANTITY = 8;
var TITLES = ['Квартира', 'Апартаменты', 'Комната', 'Дом', 'Студия'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var GUESTS = [0, 1, 2, 3, 4, 5];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Великолепная квартира с прекрасным расположением.', 'Приветливая хозяйка, отличный район, очень чисто в квартире.', 'Хозяева — очень гостеприимные и отзывчивые', 'Легкое самостоятельное прибытие с помощью мини-сейфа.', 'Идеальная чистота'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var dialogWindow = document.querySelector('.map');
dialogWindow.classList.remove('map--faded');
var dialogWidth = document.querySelector('.map').offsetWidth;

var similarPins = dialogWindow.querySelector('.map__pins');

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

var getRandomBlock = function (values) {
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
    x: getRandomFromRange(0, dialogWidth),
    y: getRandomFromRange(130, 630)
  };
};

var getRandomOffer = function (location) {
  return {
    title: getRandomArrayItem(TITLES),
    address: location.x + ', ' + location.y,
    price: getRandomFromRange(500, 2000) + '$',
    type: getRandomArrayItem(TYPES),
    rooms: getRandomFromRange(1, 7),
    guests: getRandomArrayItem(GUESTS),
    checkin: getRandomArrayItem(CHECK_TIMES),
    checkout: getRandomArrayItem(CHECK_TIMES),
    features: getRandomBlock(FEATURES),
    description: getRandomArrayItem(DESCRIPTIONS),
    photos: getRandomBlock(PHOTOS)
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
  var pinElement = similarPinTemplate.cloneNode(true);
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
similarPins.appendChild(renderPins(mockProperties));
