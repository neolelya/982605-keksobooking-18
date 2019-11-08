'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var activate = function () {
    map.classList.remove('map--faded');
    window.pins.activate();
  };

  var activateMapHandler = function () {
    if (!window.pins.downloadedData.length) {
      return;
    }
    activate();
    window.form.activateForm();
    mainPin.removeEventListener('mousedown', activateMapHandler);
  };

  var activateMapByKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      if (!window.pins.downloadedData.length) {
        return;
      }
      activate();
      window.form.activateForm();
      mainPin.removeEventListener('mousedown', activateMapHandler);
      mainPin.removeEventListener('keydown', activateMapByKeydownHandler);
    }
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    window.pins.deactivate();
    mainPin.addEventListener('mousedown', activateMapHandler);
    mainPin.addEventListener('keydown', activateMapByKeydownHandler);
  };

  mainPin.addEventListener('mousedown', activateMapHandler);
  mainPin.addEventListener('keydown', activateMapByKeydownHandler);

  window.map = {
    deactivate: deactivate
  };
})();
