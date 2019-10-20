'use strict';

(function () {
  var MAX_FILTERED_PINS_QUANTITY = 5;

  var filteredPins = [];
  var typeFilter = document.querySelector('#housing-type');

  var inputTypeChange = function () {
    window.pins.resetPins();
    filteredPins = window.pins.downloadedData.filter(function (type) {
      if (typeFilter.value === 'any') {
        return true;
      }
      return type.offer.type === typeFilter.value;
    });
    window.pins.insertPins(filteredPins.slice(0, MAX_FILTERED_PINS_QUANTITY));
  };

  typeFilter.addEventListener('change', inputTypeChange);

  window.filter = {
    inputTypeChange: inputTypeChange
  };
})();

