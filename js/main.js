'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form').querySelector('.ad-form__reset');

  var activatePage = function () {
    window.form.activateAndFillAddress();
    window.pin.activatePins();
    mainPin.removeEventListener('mousedown', activatePage);
  };

  var deactivatePage = function () {
    window.pin.deactivatePins();
    mainPin.addEventListener('mousedown', activatePage);
  };

  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', window.form.buttonKeydownHandler);
  resetButton.addEventListener('click', deactivatePage);
})();
