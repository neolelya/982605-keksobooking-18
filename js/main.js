'use strict';
// var QUANTITY = 8;
// var TITLES = ['Предложение', 'Обьявление', 'Мы предлагаем', 'Новинка'];
// var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var GUESTS = [1, 2, 3, 4, 5];
// var CHECK_TIMES = ['12:00', '13:00', '14:00'];
// var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var DESCRIPTIONS = ['Великолепная квартира с прекрасным расположением.', 'Приветливая хозяйка, отличный район, очень чисто в квартире.', 'Хозяева — очень гостеприимные и отзывчивые', 'Легкое самостоятельное прибытие с помощью мини-сейфа.', 'Идеальная чистота'];
// var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
var ENTER_KEYCODE = 13;
var MAX_PRICE = 1000000;

var dialogWindow = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');
var adTitle = adForm.querySelector('#title');
var adPrice = adForm.querySelector('#price');
var adType = adForm.querySelector('#type');
var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');
var resetButton = adForm.querySelector('.ad-form__reset');

var buttonKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
};

var setFormFieldsDisabled = function (value) {
  var formFields = document.querySelectorAll('.ad-form input, .ad-form select, .map__filters input, .map__filters select');

  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = value;
  }
};

var inputTitleEditHandler = function () {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Заголовок вашего объявления должен содержать минимум из 30 символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Заголовок вашего объявления должен содержать максимум 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Это поле обязательное для заполнения');
  } else {
    adTitle.setCustomValidity('');
  }
};

var inputPriceMaxLimitHandler = function () {
  if (adPrice.value > MAX_PRICE) {
    adPrice.setCustomValidity('Максимально возможное значение для этого поля - 1 000 000');
  } else {
    adPrice.setCustomValidity('');
  }
};

var getNumberDigit = function (number) {
  var string = '' + number;
  var result = '';
  for (var i = string.length - 1; i >= 0; i--) {
    if ((string.length - i) % 3 === 1 && string.length - i > 1) {
      result = ' ' + result;
    }
    result = string[i] + result;
  }
  return result;
};

var MinPrices = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

var inputPriceEditHandler = function () {
  if (adPrice.validity.rangeUnderflow) {
    adPrice.setCustomValidity('Цена за данное предложение не может быть ниже ' + (MinPrices[adType.value.toUpperCase()]) + ' рублей за ночь');
  }
};

var inputTypeSelectHandler = function () {
  adPrice.min = MinPrices[adType.value.toUpperCase()];
  adPrice.placeholder = getNumberDigit(MinPrices[adType.value.toUpperCase()]);
};

var inputTimeInSelectHandler = function () {
  switch (adTimeIn.value) {
    case '12:00':
      adTimeOut.value = '12:00';
      break;
    case '13:00':
      adTimeOut.value = '13:00';
      break;
    case '14:00':
      adTimeOut.value = '14:00';
      break;
  }
};

var inputTimeOutSelectHandler = function () {
  switch (adTimeOut.value) {
    case '12:00':
      adTimeIn.value = '12:00';
      break;
    case '13:00':
      adTimeIn.value = '13:00';
      break;
    case '14:00':
      adTimeIn.value = '14:00';
      break;
  }
};

var limitGuestsNumbers = function () {
  var oneGuest = adCapacity.querySelector('[value="1"]');
  var twoGuests = adCapacity.querySelector('[value="2"]');
  var threeGuests = adCapacity.querySelector('[value="3"]');
  var notForGuests = adCapacity.querySelector('[value="0"]');

  var guests = [oneGuest, twoGuests, threeGuests, notForGuests];

  var RoomsGuestsAdditions = {
    1: [oneGuest],
    2: [oneGuest, twoGuests],
    3: [oneGuest, twoGuests, threeGuests],
    100: [notForGuests]
  };

  for (var i = 0; i < guests.length; i++) {
    if (RoomsGuestsAdditions[adRoomNumber.value].includes(guests[i])) {
      guests[i].disabled = false;
      RoomsGuestsAdditions[adRoomNumber.value][0].selected = true;
    } else {
      guests[i].disabled = true;
    }
  }
};

var resetFormDataHandler = function () {
  adPrice.placeholder = '5000';
  deactivatePage();
};

var activatePage = function () {
  dialogWindow.classList.remove('map--faded');
  setFormFieldsDisabled(false);
  adForm.classList.remove('ad-form--disabled');
  adTitle.addEventListener('invalid', inputTitleEditHandler);
  adPrice.addEventListener('input', inputPriceMaxLimitHandler);
  adType.addEventListener('input', inputTypeSelectHandler);
  adPrice.addEventListener('input', inputPriceEditHandler);
  adTimeIn.addEventListener('input', inputTimeInSelectHandler);
  adTimeOut.addEventListener('input', inputTimeOutSelectHandler);
  limitGuestsNumbers();
  adRoomNumber.addEventListener('input', limitGuestsNumbers);
};

var deactivatePage = function () {
  dialogWindow.classList.add('map--faded');
  setFormFieldsDisabled(true);
  adForm.classList.add('ad-form--disabled');
  adTitle.removeEventListener('invalid', inputTitleEditHandler);
  adPrice.removeEventListener('input', inputPriceMaxLimitHandler);
  adType.removeEventListener('input', inputTypeSelectHandler);
  adPrice.removeEventListener('input', inputPriceEditHandler);
  adTimeIn.removeEventListener('input', inputTimeInSelectHandler);
  adTimeOut.removeEventListener('input', inputTimeOutSelectHandler);
  adRoomNumber.removeEventListener('input', limitGuestsNumbers);
};

var getCoordinates = function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  var y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
  addressField.readOnly = true;
  addressField.value = x + ', ' + y;
  return addressField;
};

var activateAndFillAddress = function () {
  activatePage();
  getCoordinates();
};

deactivatePage();
mainPin.addEventListener('mousedown', activatePage);
mainPin.addEventListener('mousedown', activateAndFillAddress);
mainPin.addEventListener('keydown', buttonKeydownHandler);
resetButton.addEventListener('click', resetFormDataHandler);

// var pinsContainer = dialogWindow.querySelector('.map__pins');
//
// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//
// var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
//
// var getRandomFromRange = function (min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
//
// var getRandomArrayItem = function (arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// };
//
// var getAuthor = function (number) {
//   return {
//     avatar: 'img/avatars/user' + '0' + number + '.png'
//   };
// };
//
// var getRandomArray = function (values) {
//   var result = [];
//   for (var i = 0; i < values.length; i++) {
//     if (getRandomFromRange(0, 1)) {
//       result.push(values[i]);
//     }
//   }
//   return result;
// };
//
// var getRandomLocation = function () {
//   return {
//     x: getRandomFromRange(0, dialogWindow.offsetWidth),
//     y: getRandomFromRange(130, 630)
//   };
// };
//
// var getRandomOffer = function (location) {
//   return {
//     adTitle: getRandomArrayItem(TITLES),
//     address: location.x + ', ' + location.y,
//     adPrice: getRandomFromRange(500, 10000),
//     type: getRandomArrayItem(TYPES),
//     rooms: getRandomFromRange(1, 7),
//     guests: getRandomArrayItem(GUESTS),
//     checkin: getRandomArrayItem(CHECK_TIMES),
//     checkout: getRandomArrayItem(CHECK_TIMES),
//     features: getRandomArray(FEATURES),
//     description: getRandomArrayItem(DESCRIPTIONS),
//     photos: getRandomArray(PHOTOS)
//   };
// };
//
// var getRandomProperty = function (number) {
//   var location = getRandomLocation();
//   return {
//     author: getAuthor(number),
//     offer: getRandomOffer(location),
//     location: location
//   };
// };
//
// var getMockProperties = function (quantity) {
//   var result = [];
//   for (var i = 0; i < quantity; i++) {
//     result[i] = getRandomProperty(i + 1);
//   }
//   return result;
// };
//
// var mockProperties = getMockProperties(QUANTITY);
//
// var renderPin = function (pin) {
//   var pinElement = pinTemplate.cloneNode(true);
//   pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
//   pinElement.querySelector('img').src = pin.author.avatar;
//   pinElement.querySelector('img').alt = pin.offer.adTitle;
//
//   return pinElement;
// };
//
// var renderPins = function (pins) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < pins.length; i++) {
//     fragment.appendChild(renderPin(pins[i]));
//   }
//   return fragment;
// };
// pinsContainer.appendChild(renderPins(mockProperties));
//
// var pluralize = function (count, words) {
//   var cases = [2, 0, 1, 1, 1, 2];
//   return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
// };
//
// var getCardsFeatures = function (card) {
//   var cardsFeatures = [];
//   for (var i = 0; i < card.offer.features.length; i++) {
//     cardsFeatures.push('<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>');
//   }
//   return cardsFeatures.join('');
// };
//
// var getPhotos = function (card, imgNode) {
//   var cardPhotos = [];
//   for (var i = 0; i < card.offer.photos.length; i++) {
//     var img = imgNode.cloneNode();
//     img.src = card.offer.photos[i];
//     cardPhotos.push(img.outerHTML);
//   }
//   return cardPhotos.join('');
// };
//
// var renderCard = function (card) {
//   var cardElement = cardTemplate.cloneNode(true);
//   var cardTypeNames = {
//     flat: 'Квартира',
//     bungalo: 'Бунгало',
//     house: 'Дом',
//     palace: 'Дворец'
//   };
//   cardElement.querySelector('.popup__title').textContent = card.offer.adTitle;
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardElement.querySelector('.popup__text--adPrice').textContent = card.offer.adPrice + ' ₽/ночь';
//   cardElement.querySelector('.popup__type').textContent = cardTypeNames[card.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = pluralize(card.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + card.offer.guests + ((card.offer.guests > 1) ? ' гостей' : ' гостя');
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   cardElement.querySelector('.popup__features').innerHTML = getCardsFeatures(card);
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   cardElement.querySelector('.popup__photos').innerHTML = getPhotos(card, cardElement.querySelector('.popup__photos img'));
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar;
//
//   return cardElement;
// };
//
// pinsContainer.appendChild(renderCard(getRandomProperty(1)));
