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

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    return fragment;
  };

  var insertPins = function () {
    pinsContainer.appendChild(renderPins(window.data.mockProperties));
  };

  var resetPins = function () {
    var activePins = pinsContainer.querySelectorAll('.map__pin');
    for (var i = 0; i < activePins.length; i++) {
      if (activePins[i].className !== 'map__pin map__pin--main') {
        pinsContainer.removeChild(activePins[i]);
      }
    }
  };

  window.pin = {
    insertPins: insertPins,

    resetPins: resetPins
  };
})();
