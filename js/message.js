'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderMessage = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__message').textContent = errorMessage;
    document.body.appendChild(newError);

    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscEvent(evt)) {
        document.body.removeChild(newError);
      }
    });

    newError.querySelector('.error__button').addEventListener('click', function () {
      newError.classList.add('visually-hidden');
    });
  };

  window.message = {
    renderMessage: renderMessage
  };
})();
