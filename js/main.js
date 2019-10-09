'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var resetButton = document.querySelector('.ad-form').querySelector('.ad-form__reset');

  var activatePage = function () {
    window.form.activateAndFillAddress();
    window.pin.activatePins();
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('keydown', activatePageByKeydownHandler);
  };

  var activatePageByKeydownHandler = function (evt) {
    if (window.util.isEnterEvent(evt)) {
      activatePage();
    }
  };

  var deactivatePageHandler = function () {
    window.pin.deactivatePins();
    mainPin.addEventListener('mousedown', activatePage);
    mainPin.addEventListener('keydown', activatePageByKeydownHandler);
  };

  mainPin.addEventListener('mousedown', activatePage);
  mainPin.addEventListener('keydown', activatePageByKeydownHandler);
  resetButton.addEventListener('click', deactivatePageHandler);
})();
