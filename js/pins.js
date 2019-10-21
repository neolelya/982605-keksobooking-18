'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var dialogWindow = document.querySelector('.map');

  var pinsContainer = dialogWindow.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  var insertPins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      var pinElement = renderPin(pin);
      fragment.appendChild(pinElement);
      pinElement.addEventListener('click', function () {
        window.card.insertCard(pin);
      });
    });
    pinsContainer.appendChild(fragment);
  };

  var resetPins = function () {
    var activePins = pinsContainer.querySelectorAll('.map__pin');
    activePins.forEach(function (pin) {
      if (pin.className !== 'map__pin map__pin--main') {
        pinsContainer.removeChild(pin);
      }
    });
  };

  var activatePins = function () {
    insertPins(window.pins.downloadedData);
  };

  var deactivatePins = function () {
    resetPins();
    window.card.resetCard();
  };

  var successHandler = function (pins) {
    window.pins.downloadedData = pins;
  };

  var errorHandler = function (errorMessage) {
    window.message.renderMessage(errorMessage);
  };

  window.backend.download(successHandler, errorHandler);

  window.pins = {
    insertPins: insertPins,

    activatePins: activatePins,

    resetPins: resetPins,

    deactivatePins: deactivatePins,

    downloadedData: [],
  };
})();
