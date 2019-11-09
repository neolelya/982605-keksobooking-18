'use strict';

(function () {
  var MAX_FILTERED_PINS_QUANTITY = 5;

  var Price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filteredPins = [];
  var formFilter = document.querySelector('.map__filters');
  var typeFilter = formFilter.querySelector('#housing-type');
  var priceFilter = formFilter.querySelector('#housing-price');
  var roomsFilter = formFilter.querySelector('#housing-rooms');
  var guestsFilter = formFilter.querySelector('#housing-guests');
  var featuresFilter = Array.from(formFilter.querySelectorAll('input[type=checkbox]'));

  var changeInputType = function (element) {
    return typeFilter.value === 'any' ? true : element.offer.type === typeFilter.value;
  };

  var changeInputPrice = function (element) {
    switch (priceFilter.value) {
      case Price.MIDDLE:
        return element.offer.price >= Price.MIN && element.offer.price <= Price.MAX;
      case Price.LOW:
        return element.offer.price < Price.MIN;
      case Price.HIGH:
        return element.offer.price > Price.MAX;
      default:
        return true;
    }
  };

  var changeInputRooms = function (element) {
    return roomsFilter.value === 'any' ? true : element.offer.rooms === parseInt(roomsFilter.value, 10);
  };

  var changeInputGuests = function (element) {
    return guestsFilter.value === 'any' ? true : element.offer.guests === parseInt(guestsFilter.value, 10);
  };

  var changeInputFeature = function (element) {
    return featuresFilter
      .filter(function (elem) {
        return elem.checked;
      })
      .map(function (it) {
        return it.value;
      })
      .every(function (feature) {
        return element.offer.features.includes(feature);
      });
  };

  var filterData = function (data) {
    return data.filter(function (el) {
      return changeInputType(el) &&
        changeInputPrice(el) &&
        changeInputRooms(el) &&
        changeInputGuests(el) &&
        changeInputFeature(el);
    }).slice(0, MAX_FILTERED_PINS_QUANTITY);
  };

  var insertFilteredPins = window.util.debounce(function () {
    filteredPins = window.map.downloadedData;
    window.pins.insert(filterData(filteredPins));
  });

  formFilter.addEventListener('change', function () {
    window.pins.reset();
    window.card.reset();
    insertFilteredPins();
  });
})();

