'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var activateMap = function () {
    map.classList.remove('map--faded');
    window.pins.activatePins();
  };

  var activateMapHandler = function () {
    if (!window.pins.downloadedData.length) {
      return;
    }
    activateMap();
    window.form.activateAndFillAddress();
    mainPin.removeEventListener('mousedown', activateMapHandler);
  };

  var activateMapByKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      if (!window.pins.downloadedData.length) {
        return;
      }
      activateMap();
      window.form.activateAndFillAddress();
      mainPin.removeEventListener('mousedown', activateMapHandler);
      mainPin.removeEventListener('keydown', activateMapByKeydownHandler);
    }
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
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
