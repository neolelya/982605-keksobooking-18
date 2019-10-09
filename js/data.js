'use strict';

(function () {
  var TITLES = ['Предложение', 'Обьявление', 'Мы предлагаем', 'Новинка'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var GUESTS = [1, 2, 3, 4, 5];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Великолепная квартира с прекрасным расположением.', 'Приветливая хозяйка, отличный район, очень чисто в квартире.', 'Хозяева — очень гостеприимные и отзывчивые', 'Легкое самостоятельное прибытие с помощью мини-сейфа.', 'Идеальная чистота'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var dialogWindow = document.querySelector('.map');

  var getAuthor = function (number) {
    return {
      avatar: 'img/avatars/user' + '0' + number + '.png'
    };
  };

  var getRandomLocation = function () {
    return {
      x: window.util.getRandomFromRange(0, dialogWindow.offsetWidth),
      y: window.util.getRandomFromRange(130, 630)
    };
  };

  var getRandomOffer = function (location) {
    return {
      title: window.util.getRandomArrayItem(TITLES),
      address: location.x + ', ' + location.y,
      price: window.util.getRandomFromRange(500, 10000),
      type: window.util.getRandomArrayItem(TYPES),
      rooms: window.util.getRandomFromRange(1, 7),
      guests: window.util.getRandomArrayItem(GUESTS),
      checkin: window.util.getRandomArrayItem(CHECK_TIMES),
      checkout: window.util.getRandomArrayItem(CHECK_TIMES),
      features: window.util.getRandomArray(FEATURES),
      description: window.util.getRandomArrayItem(DESCRIPTIONS),
      photos: window.util.getRandomArray(PHOTOS)
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

  window.data = {
    getMockProperties: getMockProperties,

    getRandomProperty: getRandomProperty
  };
})();
