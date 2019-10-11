'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function () {
    window.pins.activatePins();
  };

  var activateMapHandler = function () {
    activateMap();
    window.form.activateAndFillAddress();
    mainPin.removeEventListener('mousedown', activateMapHandler);
  };

  var activateMapByKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activateMap();
      window.form.activateAndFillAddress();
      mainPin.removeEventListener('mousedown', activateMapHandler);
      mainPin.removeEventListener('keydown', activateMapByKeydownHandler);
    }
  };

  var deactivateMap = function () {
    window.pins.deactivatePins();
    mainPin.addEventListener('mousedown', activateMapHandler);
    mainPin.addEventListener('keydown', activateMapByKeydownHandler);
  };

  mainPin.addEventListener('mousedown', activateMapHandler);
  mainPin.addEventListener('keydown', activateMapByKeydownHandler);

  window.map = {
    deactivateMap: deactivateMap
  };
})();
