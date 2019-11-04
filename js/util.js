'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

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

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },

    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },

    getNumberDigit: getNumberDigit,

    pluralize: pluralize,

    debounce: debounce
  };
})();
