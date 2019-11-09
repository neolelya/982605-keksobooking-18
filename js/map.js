'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var successHandler = function (pins) {
    window.map.downloadedData = pins;
    window.pins.activate(pins);
    mainPin.classList.add('map__pin--active');
  };

  var activate = function (cb) {
    map.classList.remove('map--faded');
    window.backend.download(function (pins) {
      successHandler(pins);
      cb();
    }, window.pins.errorHandler);
  };

  var activateMapHandler = function () {
    activate(function () {
      window.form.activate();
    });
    mainPin.removeEventListener('mousedown', activateMapHandler);
    mainPin.removeEventListener('keydown', activateMapByKeydownHandler);
  };

  var activateMapByKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activate(function () {
        window.form.activate();
      });
      mainPin.removeEventListener('mousedown', activateMapHandler);
      mainPin.removeEventListener('keydown', activateMapByKeydownHandler);
    }
  };

  var deactivate = function () {
    map.classList.add('map--faded');
    window.pins.deactivate();
    mainPin.classList.remove('map__pin--active');
    mainPin.addEventListener('mousedown', activateMapHandler);
    mainPin.addEventListener('keydown', activateMapByKeydownHandler);
  };

  mainPin.addEventListener('mousedown', activateMapHandler);
  mainPin.addEventListener('keydown', activateMapByKeydownHandler);

  window.map = {
    deactivate: deactivate,

    downloadedData: []
  };
})();
