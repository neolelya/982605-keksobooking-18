'use strict';

(function () {
  var dialogWindow = document.querySelector('.map');

  var pinsContainer = dialogWindow.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mainPin = dialogWindow.querySelector('.map__pin--main');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var START_X = 570;
  var START_Y = 375;
  var LEFT_LIMIT = 0;
  var RIGHT_LIMIT = pinsContainer.offsetWidth - MAIN_PIN_WIDTH;
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 625;

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

  var mainPinMoveHandler = function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var x = parseInt(mainPin.style.left, 10);
    var y = parseInt(mainPin.style.top, 10);

    var mainPinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      if (shift.x !== 0 || shift.y !== 0) {
        dragged = true;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      x = mainPin.offsetLeft + shift.x;
      y = mainPin.offsetTop + shift.y;

      if (x >= LEFT_LIMIT && x <= RIGHT_LIMIT) {
        mainPin.style.left = x + 'px';
      }
      if (y >= TOP_LIMIT && y <= BOTTOM_LIMIT) {
        mainPin.style.top = y + 'px';
      }
    };

    var handleMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      window.form.setCoordinates(x + MAIN_PIN_WIDTH / 2, y + MAIN_PIN_HEIGHT);

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', handleMouseUpHandler);

      if (dragged) {
        var handlePreventDefaultHandler = function (prevEvt) {
          prevEvt.preventDefault();

          mainPin.removeEventListener('click', handlePreventDefaultHandler);
        };
        mainPin.addEventListener('click', handlePreventDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', handleMouseUpHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMoveHandler);

  var mainPinResetCoordinates = function () {
    mainPin.style.left = START_X + 'px';
    mainPin.style.top = START_Y + 'px';
  };

  window.backend.download(successHandler, errorHandler);

  window.pins = {
    insertPins: insertPins,

    activatePins: activatePins,

    resetPins: resetPins,

    deactivatePins: deactivatePins,

    downloadedData: [],

    mainPinResetCoordinates: mainPinResetCoordinates
  };
})();
