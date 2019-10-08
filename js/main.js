'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', window.form.activateAndFillAddress);
  mainPin.addEventListener('keydown', window.form.buttonKeydownHandler);
})();
