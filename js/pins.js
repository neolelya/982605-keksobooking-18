'use strict';

(function () {
  var MAX_PINS_QUANTITY = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;
  var START_X = 570;
  var START_Y = 375;

  var dialogWindow = document.querySelector('.map');
  var pinsContainer = dialogWindow.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = dialogWindow.querySelector('.map__pin--main');

  var leftMapLimit = 0;
  var rightMapLimit = pinsContainer.offsetWidth - MAIN_PIN_WIDTH;
  var topMapLimit = 130 - MAIN_PIN_HEIGHT;
  var bottomMapLimit = 630 - MAIN_PIN_HEIGHT;

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  var removeActiveClass = function () {
    var activePinElement = pinsContainer.querySelector('.map__pin--active');
    if (activePinElement) {
      activePinElement.classList.remove('map__pin--active');
    }
  };

  var insert = function (pins) {
    var fragment = document.createDocumentFragment();
    pins
      .slice(0, MAX_PINS_QUANTITY)
      .forEach(function (pin) {
        var pinElement = renderPin(pin);
        fragment.appendChild(pinElement);
        pinElement.addEventListener('click', function () {
          removeActiveClass();
          pinElement.classList.add('map__pin--active');
          window.card.insert(pin);
        });
      });
    pinsContainer.appendChild(fragment);
  };

  var reset = function () {
    var activePins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    activePins.forEach(function (pin) {
      pinsContainer.removeChild(pin);
    });
  };

  var activate = function (data) {
    insert(data);
  };

  var deactivate = function () {
    reset();
    window.card.reset();
  };

  var errorHandler = function (errorMessage) {
    window.message.renderError(errorMessage);
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

      if (x >= leftMapLimit && x <= rightMapLimit) {
        mainPin.style.left = x + 'px';
      }
      if (y >= topMapLimit && y <= bottomMapLimit) {
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

  window.addEventListener('resize', function () {
    rightMapLimit = pinsContainer.offsetWidth - MAIN_PIN_WIDTH;
  });

  window.pins = {
    insert: insert,

    activate: activate,

    reset: reset,

    deactivate: deactivate,

    mainPinResetCoordinates: mainPinResetCoordinates,

    errorHandler: errorHandler,

    removeActiveClass: removeActiveClass
  };
})();
