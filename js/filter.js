'use strict';

(function () {
  var QUANTITY = 5;

  var filteredPins = [];
  var typeFilter = document.querySelector('#housing-type');

  var inputTypeChange = function () {
    window.pins.resetPins();
    filteredPins = (window.downloadedData).filter(function (type) {
      if (typeFilter.value === 'any') {
        return true;
      }
      return type.offer.type === typeFilter.value;
    });
    window.pins.insertPins(filteredPins.slice(0, QUANTITY));
  };

  typeFilter.addEventListener('change', inputTypeChange);

  window.filter = {
    inputTypeChange: inputTypeChange
  };
})();

