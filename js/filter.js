'use strict';

(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var formFilter = document.querySelector('.map__filters');
  var typeFilter = formFilter.querySelector('#housing-type');
  var priceFilter = formFilter.querySelector('#housing-price');
  var roomsFilter = formFilter.querySelector('#housing-rooms');
  var guestsFilter = formFilter.querySelector('#housing-guests');
  var featuresFilter = formFilter.querySelectorAll('input[type=checkbox]');

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
    for (var i = 0; i < featuresFilter.length; i++) {
      if (
        featuresFilter[i].checked &&
        !element.offer.features.includes(featuresFilter[i].value)
      ) {
        return false;
      }
    }
    return true;
  };

  var filterData = function (data) {
    return data.filter(function (el) {
      return changeInputType(el) &&
        changeInputPrice(el) &&
        changeInputRooms(el) &&
        changeInputGuests(el) &&
        changeInputFeature(el);
    });
  };

  var insertFilteredPins = window.util.debounce(function () {
    window.pins.insert(filterData(window.map.downloadedData));
  });

  formFilter.addEventListener('change', function () {
    window.pins.reset();
    window.card.reset();
    insertFilteredPins();
  });
})();

