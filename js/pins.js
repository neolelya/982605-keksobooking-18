'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var downloadedData;

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

  var insertPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < downloadedData.length; i++) {
      fragment.appendChild(renderPin(downloadedData[i]));
    }
    pinsContainer.appendChild(fragment);
  };

  var resetPins = function () {
    var activePins = pinsContainer.querySelectorAll('.map__pin');
    for (var i = 0; i < activePins.length; i++) {
      if (activePins[i].className !== 'map__pin map__pin--main') {
        pinsContainer.removeChild(activePins[i]);
      }
    }
  };

  var activatePins = function () {
    insertPins();
    window.card.insertCard(downloadedData[1]);
  };

  var deactivatePins = function () {
    resetPins();
    window.card.resetCard();
  };

  var successHandler = function (pins) {
    downloadedData = pins;
  };

  var errorHandler = function (errorMessage) {
    window.message.renderMessage(errorMessage);
  };

  window.backend.download(successHandler, errorHandler);

  window.pins = {
    activatePins: activatePins,

    deactivatePins: deactivatePins
  };
})();
