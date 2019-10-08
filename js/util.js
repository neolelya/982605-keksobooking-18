'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomFromRange = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomArray = function (values) {
    var result = [];
    for (var i = 0; i < values.length; i++) {
      if (window.util.getRandomFromRange(0, 1)) {
        result.push(values[i]);
      }
    }
    return result;
  };

  var getNumberDigit = function (number) {
    var string = '' + number;
    var result = '';
    for (var i = string.length - 1; i >= 0; i--) {
      if ((string.length - i) % 3 === 1 && string.length - i > 1) {
        result = ' ' + result;
      }
      result = string[i] + result;
    }
    return result;
  };

  var pluralize = function (count, words) {
    var cases = [2, 0, 1, 1, 1, 2];
    return count + ' ' + words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
  };

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },

    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    getRandomArrayItem: getRandomArrayItem,

    getRandomFromRange: getRandomFromRange,

    getRandomArray: getRandomArray,

    getNumberDigit: getNumberDigit,

    pluralize: pluralize
  };
})();
